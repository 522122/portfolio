"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    static associate(models) {
      Todo.belongsTo(models.TodoList)
      Todo.belongsTo(models.User)
    }
  }
  Todo.init(
    {
      content: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Todo",
    }
  )
  return Todo
}
