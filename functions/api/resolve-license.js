export async function resolveLicenseRequest(request, env) {
  const url = new URL(request.url);
  const subscriptionId = (url.searchParams.get('subscription_id') || '').trim();
  const email = (url.searchParams.get('email') || '').trim().toLowerCase();
  const product = (url.searchParams.get('product') || '').trim().toLowerCase();
  const rawMode = (url.searchParams.get('mode') || '').trim().toLowerCase();
  if (rawMode && rawMode !== 'test' && rawMode !== 'live') {
    return Response.json({ ok: false, error: 'invalid_mode', retryable: false }, { status: 400 });
  }
  const mode = rawMode || 'live';
  const isTestMode = mode === 'test';

  if (!subscriptionId) {
    return Response.json({ ok: false, error: 'subscription_id_required', retryable: false }, { status: 400 });
  }

  const legacyApiKey = env.DODO_PAYMENTS_API_KEY;
  const apiKey = isTestMode
    ? (env.DODO_PAYMENTS_API_KEY_TEST || legacyApiKey)
    : (env.DODO_PAYMENTS_API_KEY_LIVE || legacyApiKey);
  if (!apiKey) {
    return Response.json({ ok: false, error: 'server_missing_api_key', retryable: false, mode: isTestMode ? 'test' : 'live' }, { status: 500 });
  }

  const defaultApiBaseUrl = isTestMode
    ? 'https://test.dodopayments.com'
    : 'https://live.dodopayments.com';
  const modeApiBaseUrl = isTestMode
    ? env.DODO_PAYMENTS_API_BASE_URL_TEST
    : env.DODO_PAYMENTS_API_BASE_URL_LIVE;
  // In test mode, avoid accidentally forcing live host via generic base URL.
  const apiBaseUrl = String(
    modeApiBaseUrl || (isTestMode ? defaultApiBaseUrl : (env.DODO_PAYMENTS_API_BASE_URL || defaultApiBaseUrl)) || ''
  ).replace(/\/+$/, '');
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
      return Response.json({ ok: false, error: 'subscription_not_found', retryable: false, mode: isTestMode ? 'test' : 'live' }, { status: 404 });
    }

    const subscriptionData = await subscriptionResp.json();
    const customer = subscriptionData.customer || {};
    const customerId = customer.customer_id || customer.id || '';
    const customerEmail = String(customer.email || '').trim().toLowerCase();

    if (email && customerEmail && email !== customerEmail) {
      return Response.json({ ok: false, error: 'email_mismatch', retryable: false, mode: isTestMode ? 'test' : 'live' }, { status: 403 });
    }

    if (!customerId) {
      return Response.json({ ok: false, error: 'customer_not_found', retryable: false, mode: isTestMode ? 'test' : 'live' }, { status: 404 });
    }

    const items = [];
    const pageSize = 100;
    const maxPages = 5;
    for (let pageNumber = 0; pageNumber < maxPages; pageNumber += 1) {
      const listUrl = new URL(apiBaseUrl + '/license_keys');
      listUrl.searchParams.set('customer_id', customerId);
      // Do not filter by status: freshly issued keys are often not "active" yet.
      listUrl.searchParams.set('page_size', String(pageSize));
      listUrl.searchParams.set('page_number', String(pageNumber));

      const licensesResp = await fetch(listUrl.toString(), { method: 'GET', headers });
      if (!licensesResp.ok) {
        return Response.json({ ok: false, error: 'license_lookup_failed', retryable: true, mode: isTestMode ? 'test' : 'live' }, { status: 502 });
      }

      const licensesData = await licensesResp.json();
      const pageItems = Array.isArray(licensesData.items) ? licensesData.items : [];
      items.push(...pageItems);

      if (pageItems.length < pageSize) {
        break;
      }
    }
    const matched = items.find((item) => {
      if (!item) {
        return false;
      }
      const itemSubscriptionId = String(
        item.subscription_id ||
        item.subscriptionId ||
        item.subscription?.id ||
        ''
      ).trim();
      if (itemSubscriptionId !== subscriptionId) {
        return false;
      }
      if (!product) {
        return true;
      }
      const itemProduct = String(
        item.product_key ||
        item.productKey ||
        item.product?.key ||
        ''
      ).trim().toLowerCase();
      if (!itemProduct) {
        return true;
      }
      return itemProduct === product;
    });

    const fallbackMatched = matched || items.find((item) => {
      if (!item) {
        return false;
      }
      const itemSubscriptionId = String(
        item.subscription_id ||
        item.subscriptionId ||
        item.subscription?.id ||
        ''
      ).trim();
      return itemSubscriptionId === subscriptionId;
    });

    const licenseKey = String(
      fallbackMatched?.key ||
      fallbackMatched?.license_key ||
      fallbackMatched?.licenseKey ||
      ''
    ).trim();

    if (!licenseKey) {
      const subscriptionStatus = String(subscriptionData.status || '').trim().toLowerCase();
      const retryableSubscriptionStates = new Set(['active', 'trialing', 'incomplete', 'past_due']);
      const shouldRetry = retryableSubscriptionStates.has(subscriptionStatus) || subscriptionStatus === '';
      return Response.json(
        {
          ok: false,
          error: shouldRetry ? 'license_pending' : 'license_not_found',
          retryable: shouldRetry,
          mode: isTestMode ? 'test' : 'live',
          subscription_status: subscriptionStatus || 'unknown',
        },
        { status: shouldRetry ? 200 : 404 }
      );
    }

    return Response.json({
      ok: true,
      license_key: licenseKey,
      retryable: false,
      mode: isTestMode ? 'test' : 'live',
    });
  } catch (err) {
    return Response.json(
      {
        ok: false,
        error: 'internal_error',
        retryable: true,
        mode: isTestMode ? 'test' : 'live',
      },
      { status: 500 }
    );
  }
}

export async function onRequestGet(context) {
  return resolveLicenseRequest(context.request, context.env);
}
