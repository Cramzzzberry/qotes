if (!self.define) {
  let e,
    s = {}
  const i = (i, n) => (
    (i = new URL(i + '.js', n).href),
    s[i] ||
      new Promise((s) => {
        if ('document' in self) {
          const e = document.createElement('script')
          ;(e.src = i), (e.onload = s), document.head.appendChild(e)
        } else (e = i), importScripts(i), s()
      }).then(() => {
        let e = s[i]
        if (!e) throw new Error(`Module ${i} didn’t register its module`)
        return e
      })
  )
  self.define = (n, r) => {
    const t = e || ('document' in self ? document.currentScript.src : '') || location.href
    if (s[t]) return
    let o = {}
    const l = (e) => i(e, t),
      c = { module: { uri: t }, exports: o, require: l }
    s[t] = Promise.all(n.map((e) => c[e] || l(e))).then((e) => (r(...e), o))
  }
}
define(['./workbox-7cfec069'], function (e) {
  'use strict'
  self.addEventListener('message', (e) => {
    e.data && 'SKIP_WAITING' === e.data.type && self.skipWaiting()
  }),
    e.precacheAndRoute(
      [
        { url: 'assets/index-4IDb8M6v.css', revision: null },
        { url: 'assets/index-WSo7DSk_.js', revision: null },
        { url: 'index.html', revision: 'fc6d5bbbbe2295417f0aaa493c2b13db' },
        { url: 'registerSW.js', revision: '9396f0418656ec2e437c5657594f53ef' },
        { url: 'manifest.webmanifest', revision: 'dffe2ee8e1266507c93212495a286ec6' }
      ],
      {}
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL('index.html')))
})
