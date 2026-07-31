/**
 * Dopamint embed proxy — companion SPA on :5180 with framing locks stripped
 * so Cadbury can iframe it in-page (no popup / blank window).
 *
 *   Cadbury Vite  →  iframe  →  :5180  →  https://aicomp-dn.dopamint.xyz
 *
 * Run:  node scripts/dopamint-embed-proxy.mjs
 * Or:   npm run dev:widget
 */

import http from 'node:http';
import https from 'node:https';
import { URL } from 'node:url';

const UPSTREAM = process.env.DOPAMINT_ORIGIN || 'https://aicomp-dn.dopamint.xyz';
const PORT = Number(process.env.DOPAMINT_EMBED_PORT || 5180);
const upstreamUrl = new URL(UPSTREAM);

function stripFrameHeaders(headers) {
  const out = { ...headers };
  delete out['content-security-policy'];
  delete out['content-security-policy-report-only'];
  delete out['x-frame-options'];
  // Avoid telling the browser this is a different site for framing purposes
  delete out['content-security-policy'];
  return out;
}

function proxyRequest(clientReq, clientRes) {
  const targetPath = clientReq.url || '/';
  const opts = {
    hostname: upstreamUrl.hostname,
    port: 443,
    path: targetPath,
    method: clientReq.method,
    headers: {
      ...clientReq.headers,
      host: upstreamUrl.hostname,
      // Avoid compression edge-cases while piping
      'accept-encoding': 'identity',
    },
  };

  const upstreamReq = https.request(opts, (upstreamRes) => {
    const headers = stripFrameHeaders(upstreamRes.headers);

    // Keep redirects on this proxy host; preserve ?chat=… when upstream drops it
    if (headers.location) {
      try {
        let loc = Array.isArray(headers.location)
          ? headers.location[0]
          : headers.location;
        if (typeof loc === 'string') {
          const incomingQ = (targetPath.includes('?')
            ? targetPath.slice(targetPath.indexOf('?'))
            : '');
          if (loc.startsWith('http')) {
            const u = new URL(loc);
            if (u.hostname.includes('dopamint')) {
              loc = `${u.pathname}${u.search || incomingQ}${u.hash}`;
            }
          } else if (loc.startsWith('/') && !loc.includes('?') && incomingQ) {
            loc = `${loc}${incomingQ}`;
          }
          headers.location = loc;
        }
      } catch {
        /* keep */
      }
    }

    clientRes.writeHead(upstreamRes.statusCode || 502, headers);
    upstreamRes.pipe(clientRes);
  });

  upstreamReq.on('error', (err) => {
    console.error('[dopamint-embed-proxy]', err.message);
    if (!clientRes.headersSent) {
      clientRes.writeHead(502, { 'Content-Type': 'text/plain' });
    }
    clientRes.end('Dopamint embed proxy error');
  });

  clientReq.pipe(upstreamReq);
}

const server = http.createServer((req, res) => {
  // Helpful for local debugging
  if (req.url === '/__proxy_health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: true, upstream: UPSTREAM }));
    return;
  }
  proxyRequest(req, res);
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`[dopamint-embed-proxy] http://127.0.0.1:${PORT} → ${UPSTREAM}`);
  console.log(
    `[dopamint-embed-proxy] iframe: http://127.0.0.1:${PORT}/widget/companion?chat=serena`,
  );
});
