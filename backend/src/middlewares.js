// const { decodeToken } = require("./utils")

// /**
//  *
//  * @description set req.user from provided JWT token
//  */
// const parseUser = (req, res, next) => {
//   if (req.headers.authorization) {
//     req.user = decodeToken(req.headers)
//   }
//   next()
// }

// /**
//  *
//  * @description allow continue only for loged in users
//  * @todo rewrite somehow for graphql
//  */
// const authRequired = (req, res, next) => {
//   try {
//     verifyToken(req.headers)
//     next()
//   } catch (e) {
//     res.sendStatus(401)
//   }
// }

// /**
//  *
//  * @description allow continue only for admins
//  * @todo rewrite somehow for graphql
//  */
// const adminOnly = (req, res, next) => {
//   if (req.user && req.user.admin) {
//     next()
//   } else {
//     res.sendStatus(403)
//   }
// }

// /**
//  * @description validates input parameters
//  * @param path path in request
//  * @param schema Joi schema
//  */
// const validate = (path, schema) => {
//   return (req, res, next) => {
//     const { error } = schema.validate(_.get(req, path), { abortEarly: false })
//     if (!error) {
//       next()
//     } else {
//       res.status(403).json(niceJoi(error))
//     }
//   }
// }

// module.exports = {
//   parseUser,
//   adminOnly,
// }
