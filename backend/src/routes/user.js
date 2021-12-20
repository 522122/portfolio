// import express from "express"
// import { authRequired, validate } from "../middlewares"
// import * as userController from "../controllers/userController"
// import Joi from "joi"

// const router = express.Router()

// const emailSchema = Joi.string().email().required()
// const displayNameSchema = Joi.string().min(3).required()
// const passwordSchema = Joi.string().min(5).required()
// const uuidSchema = Joi.string().uuid()

// const registerSchema = Joi.object({
//   loginName: emailSchema,
//   password: passwordSchema,
//   displayName: displayNameSchema,
// })

// const loginSchema = Joi.object({
//   username: usernameSchema,
//   password: passwordSchema,
// })

// router.get("/test", authRequired, (req, res) => {
//   res.json(req.user)
// })

// router.post("/register", validate("body", registerSchema), userController.register)
// router.post("/login", validate("body", loginSchema), userController.login)
// router.post("/token", validate("body.refreshToken", uuidSchema), userController.tokenLogin)

// export default router
