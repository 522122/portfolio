const jsonwebtoken = require("jsonwebtoken")

const createToken = (data) => {
  return jsonwebtoken.sign(data, process.env.SECRET, {
    algorithm: "HS256",
    expiresIn: "10m",
  })
}

const verifyToken = (headers) => {
  const t = headers.authorization.replace(/^Bearer /, "")
  return jsonwebtoken.verify(t, process.env.SECRET, {
    algorithms: ["HS256"],
  })
}

const decodeToken = (headers) => {
  const t = headers.authorization.replace(/^Bearer /, "")
  return jsonwebtoken.decode(t)
}

const niceJoi = (error) => {
  const keys = error.details.map((d) => d.path.join("."))
  const messages = error.details.map((d) => d.message)

  return keys.reduce((a, c, index) => {
    a[c] = messages[index]
    return a
  }, {})
}

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

module.exports = {
  createToken,
  verifyToken,
  decodeToken,
  validateSchema,
}

// export const somethingWrong = (res: Response) => (error: any) => {
//   const log = db.models.ErrorLog({
//     message: JSON.stringify(error),
//   });
//   log
//     .save()
//     .then((model) => {
//       console.warn("\x1b[33m%s\x1b[0m", "Error saved", JSON.stringify(error));
//     })
//     .catch((e) => {
//       console.log(
//         "\x1b[31m%s\x1b[0m",
//         "lol, error savng error",
//         JSON.stringify(e),
//         JSON.stringify(error)
//       );
//     })
//     .finally(() => {
//       res.status(500).send("Something went wrong");
//     });
// };
