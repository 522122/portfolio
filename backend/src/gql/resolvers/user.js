const { validateSchema, createToken } = require("../../utils")
const bcrypt = require("bcrypt")
const Joi = require("joi")

const loginSchema = Joi.object({
  username: Joi.string().email().required(),
  password: Joi.string().required(),
})

const login = (db) => async (parent, args, context) => {
  const { username, password } = args.input
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

  const token = user.Tokens.length
    ? user.Tokens[0]
    : await db.Token.create({
        app: userAgent,
        UserId: user.id,
      })

  return {
    user: user?.serialize(),
    accessToken: createToken(user.serialize()),
    refreshToken: token.id,
  }
}

const register = (db) => async (parent, args, context) => {
  const { loginName, password, displayName } = args.input

  const validationResult = registerSchema.validate(args.input)

  if (validationResult.error) {
    throw Error(validationResult.error)
  }

  const user = await db.User.create({
    loginName: loginName,
    displayName,
    password,
  })

  return user.serialize()
}

module.exports = (db) => ({
  Query: {
    login: login(db),
  },
  Mutation: {
    register: register(db),
  },
})
