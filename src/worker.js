import { resolveLicenseRequest } from '../functions/api/resolve-license.js';
import { onRequestGet as getLifetimeSpots } from '../functions/api/lifetime-spots.js';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

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
