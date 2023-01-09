import jwt from "jsonwebtoken"
import { createError } from "../utils/error.js"

// verifyToken middleware
export const verifyToken = (req, res, next) => {
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

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next()
    } else {
      return next(createError(403, "You are not authorized!"))
    }
  })
}

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next()
    } else {
      return next(createError(403, "You are not authorized!"))
    }
  })
}
