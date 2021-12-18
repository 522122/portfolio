"use strict"

const { Model } = require("sequelize")
const bcrypt = require("bcrypt")

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    password
    Tokens
    id

    static associate(models) {
      User.hasMany(models.Token)
      User.hasMany(models.TodoList)
      User.hasMany(models.Todo)
    }

    serialize() {
      return {
        id: this.id,
        loginName: this.loginName,
        displayName: this.displayName,
        admin: this.admin,
      }
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      loginName: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      displayName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
          this.setDataValue("password", bcrypt.hashSync(value, 12))
        },
      },
    },
    {
      modelName: "User",
      sequelize,
      defaultScope: {
        attributes: {
          exclude: ["password", "createdAt", "updatedAt"],
        },
      },
    }
  )
  return User
}
