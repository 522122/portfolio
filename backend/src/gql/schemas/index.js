const fs = require("fs")
const { buildSchema } = require("graphql")
const path = require("path")

let schemas = []

fs.readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf(".") !== 0 && file.slice(-4) === ".gql"
  })
  .forEach((file) => {
    schemas.push(buildSchema(fs.readFileSync(path.join(__dirname, file)).toString("utf-8")))
  })

module.exports = schemas
