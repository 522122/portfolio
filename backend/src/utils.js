const jsonwebtoken = require("jsonwebtoken")

const createToken = (data, secret, expiresIn) => {
  return jsonwebtoken.sign(data, secret, {
    algorithm: "HS256",
    expiresIn,
  })
}

const verifyToken = (token, secret) => {
  try {
    return jsonwebtoken.verify(token, secret, {
      algorithms: ["HS256"],
    })
  } catch (error) {
    return false
  }
}

const createRefreshToken = (data) => {
  return createToken(data, process.env.REFRESH_SECRET, "30d")
}

const createAccessToken = (data) => {
  return createToken(data, process.env.ACCESS_SECRET, "10m")
}

const verifyRefreshToken = (token) => {
  return verifyToken(token, process.env.REFRESH_SECRET)
}

const verifyAccessToken = (token) => {
  return verifyToken(token, process.env.ACCESS_SECRET)
}

// /**
//  *
//  * @param {*} error
//  * @returns attempt to format Joi errors as key: value pairs
//  */
// const niceJoi = (error) => {
//   const keys = error.details.map((d) => d.path.join("."))
//   const messages = error.details.map((d) => d.message)

//   return keys.reduce((a, c, index) => {
//     a[c] = messages[index]
//     return a
//   }, {})
// }

/**
 *
 * @param {*} schema
 * @param {*} data
 * @description not much different than calling validate on schema directly, but saves few lines by throwing error
 */
const validateSchema = (schema, data) => {
  const { error } = schema.validate(data, { abortEarly: false })
  if (error) {
    throw error
  }
}

/**
 *
 * @param {*} context context received by resolvers
 * @description used in resolvers to identify user based on access token or throws 401 error
 */
const needUser = (context) => {
  if (!context.headers.authorization) {
    throw Error("No auth header")
  }

  const tokenData = verifyAccessToken(context.headers.authorization)

  if (tokenData) {
    return tokenData
  } else {
    throw Error(401)
  }
}

module.exports = {
  validateSchema,
  needUser,

  createRefreshToken,
  createAccessToken,

  verifyRefreshToken,
  verifyAccessToken,
}
