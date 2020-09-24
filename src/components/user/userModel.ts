import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../../models";

export interface UserAttributes {
  id: number;
  username: string;
  password: string;
}

interface UserCreationAttributes
  extends Optional<UserAttributes, keyof UserAttributes> {}

export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes {
  id!: number;
  username!: string;
  password!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      type: DataTypes.INTEGER,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        min: 8,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, modelName: "user" },
);
