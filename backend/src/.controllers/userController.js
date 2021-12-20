// import { RequestHandler } from "express"
// import { UniqueConstraintError } from "sequelize"
// import db from "../models"
// import bcrypt from "bcrypt"
// import { createToken } from "../utils"
// import AppError, { ErrorType } from "../AppError"

// export const register = async (req, res) => {
//   try {
//     await db.models.User.create({
//       loginName: req.body.username,
//       displayName: req.body.displayName,
//       password: req.body.password,
//     })

//     res.sendStatus(200)
//   } catch (e) {
//     if (e instanceof UniqueConstraintError) {
//       return res.status(403).json({
//         message: "Username already taken",
//       })
//     }

//     return res.status(403).json({
//       message: "Invalid username or password",
//     })
//   }
// }

// export const login = async (req, res) => {
//   try {
//     const user = await db.models.User.scope().findOne({
//       where: {
//         loginName: req.body.username,
//       },
//       include: {
//         model: db.models.Token,
//         where: {
//           app: req.headers["user-agent"],
//         },
//         required: false,
//       },
//     })

//     if (!user) {
//       throw new AppError(ErrorType.E_LOGIN_USER_NOT_FOUND, "User not found", req.body.username)
//     }

//     if (!bcrypt.compareSync(req.body.password, user.password)) {
//       throw new AppError(ErrorType.E_LOGIN_WRONG_PASSWORD, "Wrong password", req.body.username)
//     }

//     // remove existing token
//     if (user.Tokens?.length) {
//       await user.Tokens[0].destroy()
//     }

//     // create new one-time refresh token
//     const token = await db.models.Token.create({
//       app: req.headers["user-agent"],
//       UserId: user.id,
//     })

//     res.json({
//       ...user.serialize(),
//       token: createToken(user.serialize()),
//       refresh: token.id,
//     })
//   } catch (e) {
//     // handled excepions
//     if (e instanceof AppError) {
//       return res.sendStatus(403)
//     }

//     console.log(e)
//     res.sendStatus(500)
//   }
// }

// export const tokenLogin = async (req, res) => {
//   try {
//     const token = await db.models.Token.findOne({
//       where: {
//         id: req.body.refreshToken,
//       },
//       include: {
//         model: db.models.User,
//       },
//     })

//     if (!token) {
//       throw new AppError(ErrorType.E_LOGIN_TOKEN_NOT_FOUND, "Token not found", req.body.refreshToken)
//     }

//     // remove existing token
//     await token.destroy()

//     // malicious behaviour, token exists but wrong user agent
//     if (token.app !== req.headers["user-agent"]) {
//       throw new AppError(ErrorType.E_LOGIN_TOKEN_APP_MISMATCH, "Token app mismatch", req.body.refreshToken)
//     }

//     // create new one-time refresh token
//     const newToken = await db.models.Token.create({
//       app: req.headers["user-agent"],
//       UserId: token.User.id,
//     })

//     res.json({
//       ...token.User.serialize(),
//       token: createToken(token.User.serialize()),
//       refresh: newToken.id,
//     })
//   } catch (e) {
//     // handled excepions
//     if (e instanceof AppError) {
//       console.log(e)
//       return res.sendStatus(403)
//     }

//     console.log(e)
//     res.sendStatus(500)
//   }
// }
