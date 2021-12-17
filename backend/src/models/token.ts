import { Model, DataTypes } from "sequelize"
import sequelize from "./instance"
import User from "./user"

class Token extends Model {
  public id!: string
  public app!: string | null
  public blacklisted!: boolean

  public UserId?: string
  public User?: User

  public setUser!: (user: User) => void
}

Token.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    app: {
      type: DataTypes.STRING,
    },
    blacklisted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    defaultScope: {
      where: {
        blacklisted: false,
      },
    },
  }
)

export default Token
