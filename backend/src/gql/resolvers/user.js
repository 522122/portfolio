const { validateSchema, verifyRefreshToken, createAccessToken, createRefreshToken } = require("../../utils")
const bcrypt = require("bcrypt")
const Joi = require("joi")

const refreshTokenSchema = Joi.string()
  .required()
  .custom((val) => verifyRefreshToken(val))

const token = (db) => async (parent, args, context) => {
  const { refreshToken } = args
  const userAgent = context.headers["user-agent"]

  validateSchema(refreshTokenSchema, refreshToken)

  const token = await db.Token.findOne({
    where: {
      jwt: refreshToken,
    },
    include: {
      model: db.User,
    },
  })

  if (!token) {
    throw Error("Invalid token")
  }

  const newToken = await db.Token.create({
    jwt: createRefreshToken({
      sub: token.User.id,
    }),
    app: userAgent,
    UserId: token.User.id,
  })

  await token.destroy()

  return {
    user: token.User.serialize(),
    accessToken: createAccessToken({
      sub: newToken.UserId,
    }),
    refreshToken: newToken.jwt,
  }
}

const loginSchema = Joi.object({
  username: Joi.string().email().required(),
  password: Joi.string().required(),
})

const login = (db) => async (parent, args, context) => {
  const { username, password } = args
  const userAgent = context.headers["user-agent"]

  validateSchema(loginSchema, {
    username,
    password,
  })

  const user = await db.User.scope().findOne({
    where: {
      loginName: username,
    },
    include: {
      model: db.Token,
      where: {
        app: userAgent,
      },
      required: false,
    },
  })

  if (!user) {
    throw Error("wrong username / password")
  }

  const match = await bcrypt.compare(password, user.password)

  if (!match) {
    throw Error("wrong username / password")
  }

  const refreshToken = user.Tokens.length
    ? user.Tokens[0]
    : await db.Token.create({
        jwt: createRefreshToken({
          sub: user.id,
        }),
        app: userAgent,
        UserId: user.id,
      })

  const accessToken = createAccessToken({
    sub: user.id,
  })

  return {
    user: user.serialize(),
    accessToken,
    refreshToken: refreshToken.jwt,
  }
}

const registerSchema = Joi.object({
  loginName: Joi.string().email().required(),
  password: Joi.string().min(5).required(),
  displayName: Joi.string().trim().min(1).max(10).required(),
})

const register = (db) => async (parent, args, context) => {
  const { loginName, password, displayName } = args.input

  validateSchema(registerSchema, {
    loginName,
    password,
    displayName,
  })

  const user = await db.User.create({
    loginName: loginName,
    displayName,
    password,
  })

  return user.serialize()
}

module.exports = (db) => ({
  Query: {},
  Mutation: {
    login: login(db),
    register: register(db),
    token: token(db),
  },
})
