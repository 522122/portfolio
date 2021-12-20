const dotenv = require("dotenv")
dotenv.config({ path: __dirname + "/../.env" })

const colors = require("colors")
const express = require("express")
const cors = require("cors")
const { graphqlHTTP } = require("express-graphql")

const db = require("./models")
const typeDefs = require("./gql/schemas")
const resolvers = require("./gql/resolvers")

const { makeExecutableSchema } = require("@graphql-tools/schema")

colors.enable()

const app = express()

app.use(cors())

app.use(
  "/graphql",
  graphqlHTTP({
    schema: makeExecutableSchema({
      resolvers,
      typeDefs,
    }),
    graphiql: process.env.NODE_ENV === "development",
  })
)
;(async () => {
  if (process.env.NODE_ENV === "development") {
    await db.sequelize.sync({})
  }

  app.listen(process.env.PORT, () => {
    console.log(`App running in ${process.env.NODE_ENV} mode on port: ${process.env.PORT}`.green.bold)
  })
})()
