const jwt = require ("jsonwebtoken")
const { createError } = require ("../utils/error.js")

// verifyToken middleware
const verifyToken = (req, res, next) => {
  // get access_token = cookies = the request object
  const token = req.cookies.access_token
  // if there is no token stored in cookies, the request is unauthorized
  if (!token) {
    return next(createError(401, "You are not authenticated!"))
  }

  // if there is a token, we will verify it and get the user information
  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return next(createError(403, "Token is not valid!"))
    // if everything is okay, set new request property which is user new information and go to next operation
    req.user = user
    next()
  })
}

// verifyUser middleware
const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    // if the user id is the same as the id in the url, then the user is authorized to do the operation
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next()
    } else {
      // else the user is not authorized to do the operation
      return next(createError(403, "You are not authorized!"))
    }
  })
}

// verifyAdmin middleware
const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    // if the user is admin, then the user is authorized to do the operation
    if (req.user.isAdmin) {
      next()
    } else {
      // else the user is not authorized to do the operation
      return next(createError(403, "You are not authorized!"))
    }
  })
}

module.exports = { verifyToken, verifyUser, verifyAdmin }
