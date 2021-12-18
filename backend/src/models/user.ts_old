import { Model, DataTypes } from "sequelize"
import sequelize from "./instance"
import Token from "./token"
import bcrypt from "bcrypt"

class User extends Model {
  public id!: string
  public password!: string
  public loginName!: string
  public displayName!: string
  public admin!: boolean

  public Tokens?: Token[]

  public serialize() {
    return {
      id: this.id,
      loginName: this.loginName,
      displayName: this.displayName,
      admin: this.admin,
    }
  }
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    loginName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value: string) {
        this.setDataValue("password", bcrypt.hashSync(value, 12))
      },
    },
  },
  {
    sequelize,
    defaultScope: {
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
    },
  }
)

export default User
