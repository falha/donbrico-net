export async function onRequestGet(context) {
  const { env } = context;

  const totalSpots = 100;
  
  // WorkDesk Lifetime Product ID
  const productId = 'pdt_0NdlXnYSUfwfJLnO5MKgR';
  
  const apiKey = env.DODO_PAYMENTS_API_KEY_LIVE || env.DODO_PAYMENTS_API_KEY;
  const apiBaseUrl = (env.DODO_PAYMENTS_API_BASE_URL_LIVE || env.DODO_PAYMENTS_API_BASE_URL || 'https://live.dodopayments.com').replace(/\/+$/, '');

  let sold = 0;
  let source = 'safe_default';

  if (apiKey) {
    try {
      const endpoint = `${apiBaseUrl}/payments?product_id=${encodeURIComponent(productId)}&status=succeeded&limit=1`;
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        // Parse the total sold from the pagination or total property
        const count = data?.total_count ?? data?.pagination?.total_count ?? data?.total ?? data?.count ?? 0;
        sold = Math.max(0, Math.trunc(Number(count)));
        source = 'dodo_live';
      }
    } catch (err) {
      console.error('Failed to fetch Dodo payments count', err);
    }
  }

  const remaining = Math.max(0, totalSpots - sold);

  const payload = {
    total: totalSpots,
    sold,
    remaining,
    updatedAt: new Date().toISOString(),
    source
  };

  return new Response(JSON.stringify(payload), {
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'access-control-allow-origin': '*',
      'cache-control': `public, max-age=60, s-maxage=900, stale-while-revalidate=120`,
    },
  });
}
