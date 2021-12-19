"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    static associate(models) {
      Token.belongsTo(models.User)
    }
  }
  Token.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      app: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Token",
    }
  )
  return Token
}
