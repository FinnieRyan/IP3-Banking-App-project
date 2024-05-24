import jwt from 'jsonwebtoken'

function auth(req, res, next) {
  const token = req.header('x-auth-token')
  if (!token)
    return res.status(401).json({ msg: 'No token to complete request' })

  try {
    const decoded = jwt.verify(token, 'access_token_secret')
    req.user = decoded
    next()
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' })
  }
}

export default auth
