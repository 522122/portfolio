import express from "express"
import { parseUser } from "./middlewares"
import userRoute from "./routes/user"
import dotenv from "dotenv"
import db from "./models"
import colors from "colors"

colors.enable()
dotenv.config({ path: "../.env" })
const app = express()

app.use(express.json())
app.use(parseUser)

app.use("/api/1/user", userRoute)

app.listen(process.env.PORT, () => {
  console.log(`App running in ${process.env.NODE_ENV} mode on port: ${process.env.PORT}`.green.bold)
})

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  db.sequelize.sync({})
}
