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
      completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      UserId: {
        type: DataTypes.UUID,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      TodoListId: {
        type: DataTypes.UUID,
        references: {
          model: "TodoLists",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    },
    {
      sequelize,
      modelName: "Todo",
    }
  )
  return Todo
}
