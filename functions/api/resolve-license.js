export async function onRequestGet(context) {
  const url = new URL(context.request.url);
  const subscriptionId = (url.searchParams.get('subscription_id') || '').trim();
  const email = (url.searchParams.get('email') || '').trim().toLowerCase();
  const product = (url.searchParams.get('product') || '').trim().toLowerCase();

  if (!subscriptionId) {
    return Response.json({ ok: false, error: 'subscription_id is required' }, { status: 400 });
  }

  const apiKey = context.env.DODO_PAYMENTS_API_KEY;
  if (!apiKey) {
    return Response.json({ ok: false, error: 'server_missing_api_key' }, { status: 500 });
  }

  const apiBaseUrl = (context.env.DODO_PAYMENTS_API_BASE_URL || 'https://api.dodopayments.com').replace(/\/+$/, '');
  const headers = {
    Authorization: 'Bearer ' + apiKey,
    Accept: 'application/json'
  };

  try {
    const subscriptionResp = await fetch(apiBaseUrl + '/subscriptions/' + encodeURIComponent(subscriptionId), {
      method: 'GET',
      headers
    });
    if (!subscriptionResp.ok) {
      return Response.json({ ok: false, error: 'subscription_not_found' }, { status: 404 });
    }

    const subscriptionData = await subscriptionResp.json();
    const customer = subscriptionData.customer || {};
    const customerId = customer.customer_id || customer.id || '';
    const customerEmail = String(customer.email || '').trim().toLowerCase();

    if (email && customerEmail && email !== customerEmail) {
      return Response.json({ ok: false, error: 'email_mismatch' }, { status: 403 });
    }

    if (!customerId) {
      return Response.json({ ok: false, error: 'customer_not_found' }, { status: 404 });
    }

    const listUrl = new URL(apiBaseUrl + '/license_keys');
    listUrl.searchParams.set('customer_id', customerId);
    listUrl.searchParams.set('status', 'active');
    listUrl.searchParams.set('page_size', '100');
    listUrl.searchParams.set('page_number', '0');

    const licensesResp = await fetch(listUrl.toString(), { method: 'GET', headers });
    if (!licensesResp.ok) {
      return Response.json({ ok: false, error: 'license_lookup_failed' }, { status: 502 });
    }

    const licensesData = await licensesResp.json();
    const items = Array.isArray(licensesData.items) ? licensesData.items : [];
    const matched = items.find((item) => {
      if (!item || item.subscription_id !== subscriptionId) {
        return false;
      }
      if (!product) {
        return true;
      }
      return true;
    });

    const licenseKey = matched && matched.key ? String(matched.key).trim() : '';
    if (!licenseKey) {
      return Response.json({ ok: false, error: 'license_not_found' }, { status: 404 });
    }

    return Response.json({ ok: true, license_key: licenseKey });
  } catch (err) {
    return Response.json({ ok: false, error: 'internal_error' }, { status: 500 });
  }
}
