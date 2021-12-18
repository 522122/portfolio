import sequelize from "./instance"

import _user from "./user"
import _token from "./token"
import _todoList from "./todolist"
import _todo from "./todo"
import { DataTypes } from "sequelize"

/** difficult to preserv types when initializing in loop */
const models = {
  User: _user(sequelize, DataTypes),
  Token: _token(sequelize, DataTypes),
  TodoList: _todoList(sequelize, DataTypes),
  Todo: _todo(sequelize, DataTypes),
}

/** @todo set assoc keys in models / migrations manually so cli migrate can create working DB */
Object.values(models).forEach((model) => {
  model.associate(models)
})

export default {
  sequelize,
  models,
}
