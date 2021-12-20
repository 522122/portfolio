const { needUser } = require("../../utils")

module.exports = (db) => ({
  Query: {
    test: (a, b, c) => {
      return "Hello dude!"
    },
    protected: (parent, args, context) => {
      const user = needUser(context)
      return "Hello " + JSON.stringify(user)
    },
  },
})
