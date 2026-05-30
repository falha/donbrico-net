import { resolveLicenseRequest } from '../functions/api/resolve-license.js';
import { onRequestGet as getLifetimeSpots } from '../functions/api/lifetime-spots.js';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const host = url.hostname;

    // Normalization: Force HTTPS and non-www domain in production
    const isLocalhost = host === 'localhost' || host === '127.0.0.1';
    if (!isLocalhost) {
      let redirectNeeded = false;
      let targetHost = host;
      let targetProtocol = url.protocol;

      if (url.protocol === 'http:') {
        targetProtocol = 'https:';
        redirectNeeded = true;
      }

      if (host.startsWith('www.')) {
        targetHost = host.slice(4); // Remove 'www.'
        redirectNeeded = true;
      }

      if (redirectNeeded) {
        const canonicalUrl = `${targetProtocol}//${targetHost}${url.pathname}${url.search}`;
        return new Response(null, {
          status: 301,
          headers: {
            'Location': canonicalUrl,
            'Cache-Control': 'public, max-age=31536000'
          }
        });
      }
    }

    if (url.pathname === '/api/resolve-license') {
      if (request.method !== 'GET') {
        return Response.json({ ok: false, error: 'method_not_allowed' }, { status: 405 });
      }
      return resolveLicenseRequest(request, env);
    }

    if (url.pathname === '/api/lifetime-spots' || url.pathname === '/api/lifetime-spots/') {
      if (request.method !== 'GET') {
        return Response.json({ ok: false, error: 'method_not_allowed' }, { status: 405 });
      }
      return getLifetimeSpots({ env, request });
    }

    return env.ASSETS.fetch(request);
  }
};
