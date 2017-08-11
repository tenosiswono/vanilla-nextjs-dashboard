const express = require('express');
const { join } = require('path');
const { parse } = require('url');
const next = require('next');
const LRUCache = require('lru-cache');
const extractSessionFromCookie = require('./modules/extractSessionFromCookie')

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// This is where we cache our rendered HTML pages
const ssrCache = new LRUCache({
  max: 100,
  maxAge: 60, // 1hour
});

app.prepare()
.then(() => {
  const server = express();

  // Use the `renderAndCache` utility defined below to serve pages
  server.get('/', (req, res) => {
    req.session = extractSessionFromCookie(req);
    renderAndCache(req, res, '/');
  });

  server.get('/module', (req, res) => {
    req.session = extractSessionFromCookie(req);
    renderAndCache(req, res, '/module');
  });
  
  server.get('/sign-in', (req, res) => {
    req.session = extractSessionFromCookie(req);
    const actualPage = '/sign-in';
    const queryParams = { next: req.query.next };
    renderAndCache(req, res, actualPage, queryParams);
  });

  server.get('/secured', (req, res) => {
    req.session = extractSessionFromCookie(req);
    const actualPage = '/secured';
    const queryParams = { next: req.query.next };
    renderAndCache(req, res, actualPage, queryParams);
  });

  server.get('/service-worker.js', (req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname } = parsedUrl;
    const filePath = join(__dirname, '.next', pathname);
    app.serveStatic(req, res, filePath);
  });

  server.get('*', (req, res) => handle(req, res));
  /* eslint-disable no-console */
  server.listen(process.env.PORT || 3000, (err) => {
    if (err) throw err;
    console.log('> Ready asa on http://localhost:' + process.env.PORT || 3000);
  });
})
.catch((ex) => {
  console.error(ex.stack);
  process.exit(1);
});

/*
 * NB: make sure to modify this to take into account anything that should trigger
 * an immediate page change (e.g a locale stored in req.session)
 */
function getCacheKey(req) {
  return `${req.url}`;
}

function renderAndCache(req, res, pagePath, queryParams) {
  const key = getCacheKey(req);

  // If we have a page in the cache, let's serve it
  if (ssrCache.has(key)) {
    console.log(`CACHE HIT: ${key}`);
    res.send(ssrCache.get(key));
    return;
  }

  // If not let's render the page into HTML
  app.renderToHTML(req, res, pagePath, queryParams)
    .then((html) => {
      // Let's cache this page
      console.log(`CACHE MISS: ${key}`);
      ssrCache.set(key, html);

      res.send(html);
    })
    .catch((err) => {
      app.renderError(err, req, res, pagePath, queryParams);
    });
}
