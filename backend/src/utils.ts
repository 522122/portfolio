import jsonwebtoken from "jsonwebtoken"
import Joi from "joi"

export const createToken = (data: any) => {
  return jsonwebtoken.sign(data, process.env.SECRET!, {
    algorithm: "HS256",
    expiresIn: "10m",
  })
}

export const verifyToken = (headers: any) => {
  const t = headers.authorization.replace(/^Bearer /, "")
  return jsonwebtoken.verify(t, process.env.SECRET!, {
    algorithms: ["HS256"],
  })
}

export const decodeToken = (headers: any) => {
  const t = headers.authorization.replace(/^Bearer /, "")
  return jsonwebtoken.decode(t)
}

export const niceJoi = (error: Joi.ValidationError) => {
  const keys = error.details.map((d) => d.path.join("."))
  const messages = error.details.map((d) => d.message)

  return keys.reduce(
    (a: { [key: string]: any }, c, index) => {
      a.errors[c] = messages[index]
      return a
    },
    { errors: {} }
  )
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
