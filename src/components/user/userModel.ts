import { Model, DataTypes, Optional } from "sequelize";
import bcrypt from "bcrypt";
import { sequelize } from "../../config/sequelize";
import AppError from "../../utils/AppError";

export interface UserAttributes {
  id: string;
  username: string;
  password: string;
}

interface UserCreationAttributes
  extends Optional<UserAttributes, keyof UserAttributes> {}

export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes {
  id!: string;
  username!: string;
  password!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Check if the saved password and request password is the same
  correctPassword = async function (
    candidatePassword: string,
    userPassword: string,
  ) {
    // console.log(candidatePassword, userPassword);
    try {
      const compare = await bcrypt.compare(candidatePassword, userPassword);
      return compare;
    } catch (err) {
      throw new AppError("Error when checking password!", 500);
    }
  };
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      unique: true,
      defaultValue: DataTypes.UUIDV4,
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
  {
    sequelize,
    modelName: "user",
    paranoid: true,
    underscored: true,
    defaultScope: {
      attributes: {
        exclude: ["password", "deletedAt"],
      },
    },
  },
);

const hashPassword = async (user: any) => {
  if (!user.changed("password")) {
    return;
  }

  // hash the password with the cost of 12
  await bcrypt
    .hash(user.password, 12)
    .then((hash: any) => (user.password = hash));
};

//  hash the password
User.beforeCreate(hashPassword);
User.beforeUpdate(hashPassword);
