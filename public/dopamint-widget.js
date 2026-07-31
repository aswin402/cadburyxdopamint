/**
 * Vanilla Dopamint companion widget loader.
 *
 * Drop on any host page (including Cadbury):
 *   <script
 *     src="/dopamint-widget.js"
 *     data-companion="serena"
 *     data-mode="popup"
 *     data-origin="https://aicomp-dn.dopamint.xyz"
 *   ></script>
 *
 * Modes:
 *   popup  — opens sized chat window (works without frame-ancestors changes)
 *   iframe — mounts inline iframe (requires Dopamint CSP allowlist)
 *   bubble — floating launcher that opens popup/iframe
 */
(function () {
  'use strict';

  var script = document.currentScript;
  if (!script) return;

  var companion = script.getAttribute('data-companion') || 'serena';
  var mode = script.getAttribute('data-mode') || 'bubble';
  var origin = (
    script.getAttribute('data-origin') || 'https://aicomp-dn.dopamint.xyz'
  ).replace(/\/$/, '');
  var proxyPrefix = script.getAttribute('data-proxy') || '/dopamint-embed';
  var width = Number(script.getAttribute('data-width') || 400);
  var height = Number(script.getAttribute('data-height') || 680);

  function chatUrl(useProxy) {
    var base = useProxy
      ? proxyPrefix + '/widget/companion'
      : origin + '/widget/companion';
    return (
      base +
      '?chat=' +
      encodeURIComponent(companion) +
      '&host=widget'
    );
  }

  function openPopup() {
    window.open(
      chatUrl(false),
      'dopamint-' + companion,
      'width=420,height=720,menubar=no,toolbar=no,location=no,status=no,resizable=yes,scrollbars=yes',
    );
  }

  function mountIframe(parent) {
    var wrap = document.createElement('div');
    wrap.setAttribute('data-dopamint-widget', companion);
    wrap.style.cssText =
      'position:relative;width:' +
      width +
      'px;max-width:100%;height:' +
      height +
      'px;border-radius:20px;overflow:hidden;background:#15042A;box-shadow:0 20px 50px rgba(0,0,0,.45);';

    var skeleton = document.createElement('div');
    skeleton.style.cssText =
      'position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:#E2C97C;font:600 13px/1.4 system-ui,sans-serif;';
    skeleton.textContent = 'Loading companion…';
    wrap.appendChild(skeleton);

    var iframe = document.createElement('iframe');
    // Same-origin proxy so chat loads in-page without popup / CSP block
    iframe.src = chatUrl(true);
    iframe.title = 'Dopamint companion — ' + companion;
    iframe.allow = 'microphone; camera; fullscreen; clipboard-read; clipboard-write';
    iframe.allowFullscreen = true;
    iframe.style.cssText =
      'border:0;width:100%;height:100%;opacity:0;transition:opacity .25s ease;background:#0b0614;';
    wrap.appendChild(iframe);

    window.addEventListener('message', function (e) {
      var data = e.data || {};
      var type = String(data.type || '');
      if (type === 'dopamint:ready' || type === 'ready') {
        iframe.style.opacity = '1';
        if (skeleton.parentNode) skeleton.parentNode.removeChild(skeleton);
      }
      if ((type === 'dopamint:resize' || type === 'resize') && data.height) {
        wrap.style.height = Math.max(320, Number(data.height)) + 'px';
      }
    });

    iframe.addEventListener('load', function () {
      iframe.style.opacity = '1';
      if (skeleton.parentNode) skeleton.parentNode.removeChild(skeleton);
    });

    parent.appendChild(wrap);
    return wrap;
  }

  function mountBubble() {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Chat with ' + companion);
    btn.textContent = 'Chat with ' + companion;
    btn.style.cssText =
      'position:fixed;right:16px;bottom:16px;z-index:2147483000;border:0;border-radius:999px;padding:14px 18px;background:linear-gradient(135deg,#E2C97C,#C9A84C);color:#4b0983;font:700 13px/1 system-ui,sans-serif;cursor:pointer;box-shadow:0 12px 30px rgba(0,0,0,.35);';
    btn.addEventListener('click', openPopup);
    document.body.appendChild(btn);
  }

  if (mode === 'iframe') {
    var targetSel = script.getAttribute('data-target');
    var target = targetSel ? document.querySelector(targetSel) : null;
    mountIframe(target || document.body);
  } else if (mode === 'popup') {
    openPopup();
  } else {
    mountBubble();
  }
})();
