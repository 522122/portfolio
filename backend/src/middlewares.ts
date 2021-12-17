import { RequestHandler } from "express"
import { JwtPayload } from "jsonwebtoken"
import { decodeToken, verifyToken, niceJoi } from "./utils"
import Joi from "joi"
import _ from "lodash"

interface JwtUser extends JwtPayload {
  id: string
  loginName: string
  displayName: string
  admin: boolean
}

declare global {
  namespace Express {
    interface Request {
      user: JwtUser
    }
  }
}

/**
 *
 * @description set req.user from provided JWT token
 */
export const parseUser: RequestHandler = (req, res, next) => {
  if (req.headers.authorization) {
    req.user = decodeToken(req.headers) as JwtUser
  }
  next()
}

/**
 *
 * @description allow continue only for loged in users
 */
export const authRequired: RequestHandler = (req, res, next) => {
  try {
    verifyToken(req.headers)
    next()
  } catch (e) {
    res.sendStatus(401)
  }
}

/**
 *
 * @description allow continue only for admins
 */
export const adminOnly: RequestHandler = (req, res, next) => {
  if (req.user.admin) {
    next()
  } else {
    res.sendStatus(403)
  }
}

/**
 * @description validates input parameters
 * @param path path in request
 * @param schema Joi schema
 */
export const validate = (path: string, schema: Joi.Schema): RequestHandler => {
  return (req, res, next) => {
    const { error } = schema.validate(_.get(req, path), { abortEarly: false })
    if (!error) {
      next()
    } else {
      res.status(403).json(niceJoi(error))
    }
  }
}
