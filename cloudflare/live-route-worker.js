/**
 * Optional Cloudflare Worker for exact /live routing.
 * Prefer _redirects on Pages when possible.
 */
const BROADCAST = 'https://x.com/i/broadcasts/1nxeLLzpWlRJX';
const LIVE_ASSET = '/live/index.html';
const GROVE_ASSET = '/fable5-living-mirror.html';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';

    if (path === '/live' || path.startsWith('/live/')) {
      if (path === '/live' || path === '/live/index.html') {
        const assetUrl = new URL(LIVE_ASSET, url.origin);
        return env.ASSETS
          ? env.ASSETS.fetch(new Request(assetUrl, request))
          : Response.redirect(assetUrl.toString(), 302);
      }
    }

    if (path === '/broadcast') {
      return Response.redirect(BROADCAST, 302);
    }

    if (path === '/grove' || path === '/mirror') {
      return Response.redirect(new URL(GROVE_ASSET, url.origin).toString(), 302);
    }

    if (env.ASSETS) return env.ASSETS.fetch(request);
    return fetch(request);
  },
};
