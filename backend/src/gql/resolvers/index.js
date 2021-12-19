const fs = require("fs")
const path = require("path")
const basename = path.basename(__filename)
const db = require("../../models")

let resolvers = []

fs.readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  })
  .forEach((file) => {
    resolvers.push(require(path.join(__dirname, file))(db))
  })

module.exports = resolvers
