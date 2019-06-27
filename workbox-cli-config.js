module.exports = {
  "globDirectory": "dist/public/",
  "globPatterns": [
    "**/*.{js,html,png}"
  ],
  "swDest": "./dist/public/sw.js",
  "globIgnores": [
    "../workbox-cli-config.js",

  ],
  skipWaiting: true,
  clientsClaim: true,
  navigateFallback: '/index.html'
};
