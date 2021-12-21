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
      jwt: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      app: DataTypes.STRING,
      UserId: {
        type: DataTypes.UUID,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    },
    {
      sequelize,
      modelName: "Token",
    }
  )
  return Token
}
