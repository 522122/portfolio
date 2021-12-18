"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class TodoList extends Model {
    static associate(models) {
      TodoList.belongsTo(models.User)
      TodoList.hasMany(models.Todo)
    }
  }
  TodoList.init(
    {
      title: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "TodoList",
    }
  )
  return TodoList
}
