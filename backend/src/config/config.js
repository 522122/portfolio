const Path = require("path")

module.exports = {
  development: {
    dialect: "sqlite",
    storage: __dirname + "/../../development.sqlite",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "sqlite",
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "sqlite",
  },
}
