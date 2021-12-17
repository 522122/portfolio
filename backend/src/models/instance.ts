import { Sequelize, Options } from "sequelize"
import _config from "../config/config.json"

const config = _config[process.env.NODE_ENV! as "production" | "test" | "development"]

export default new Sequelize(config as Options)
