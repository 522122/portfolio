const { needUser } = require("../../utils")

const todoLists = (db) => (parent, args, context) => {
  const user = needUser(context)
  return db.TodoList.findAll({
    where: {
      UserId: user.sub,
    },
  })
}

const todos = (db) => (parent, args, context) => {
  const user = needUser(context)
  return db.Todo.findAll({
    where: {
      TodoListId: parent.id,
      UserId: user.sub,
    },
  })
}

module.exports = (db) => ({
  TodoList: {
    Todos: todos(db),
  },
  Query: {
    todoLists: todoLists(db),
  },
})
