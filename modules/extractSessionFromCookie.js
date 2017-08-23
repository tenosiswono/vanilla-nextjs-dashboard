const jwt = require('jsonwebtoken')

const authenticationSecretKey = process.env.JWT_SECRET || 'vanilla-dev';

const extractSessionFromCookie = (req, res) => {
  const { cookie } = req.headers

  // Skip if there's no cookie
  // Also skip urls that start with `_` e.g. `__next/*`
  if (cookie && req.url[1] !== '_') {
    // Pull out the `token` cookie
    const tokenCookie = cookie
      .split(';')
      .map(s => s.trim())
      .find(s => s.startsWith('token='))

    // If there's a token
    if (tokenCookie) {
      // Pull out and cleanup token
      const token = tokenCookie.split('=').pop().trim()

      // If there's a cleaned up token
      if (token) {
        // Decode the token and return it
        let session
        try {
          session = jwt.verify(token, authenticationSecretKey)
          return { token, session }
        } catch (error) {
          res.redirect('/sign-out');
          console.error(error)
        }
      }
    }
  }
  return null
}

module.exports = extractSessionFromCookie
