import sequelize from "./instance"

import User from "./user"
import Token from "./token"

User.hasMany(Token)
Token.belongsTo(User)

export default {
  sequelize,
  models: {
    User,
    Token,
  },
}
