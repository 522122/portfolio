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
      modelName: "TodoList",
    }
  )
  return TodoList
}
