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
    const f = (e) => i(e, t),
      l = { module: { uri: t }, exports: o, require: f }
    s[t] = Promise.all(n.map((e) => l[e] || f(e))).then((e) => (r(...e), o))
  }
}
define(['./workbox-7cfec069'], function (e) {
  'use strict'
  self.addEventListener('message', (e) => {
    e.data && 'SKIP_WAITING' === e.data.type && self.skipWaiting()
  }),
    e.precacheAndRoute(
      [
        { url: 'assets/index--Q7YElSf.js', revision: null },
        { url: 'assets/index-4IDb8M6v.css', revision: null },
        { url: 'index.html', revision: 'fcb39e9f988fa5d8b3116e6cc7308fb9' },
        { url: 'registerSW.js', revision: '9396f0418656ec2e437c5657594f53ef' },
        { url: 'manifest.webmanifest', revision: '3d375af557a927ada1bf51e3d536f5bd' }
      ],
      {}
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL('index.html')))
})
