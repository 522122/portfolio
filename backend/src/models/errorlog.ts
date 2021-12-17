import { Model, DataTypes, Sequelize } from "sequelize"

/**
 * @todo finish this model and store unhandled exceptions into DB?
 *
 * */
class ErrorLog extends Model {}

export default (sequelize: Sequelize) => {
  ErrorLog.init(
    {
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
    }
  )

  return ErrorLog
}
