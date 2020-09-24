import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../../config/sequelize";

interface NoteAttributes {
  id: number;
  name: string;
  content: string;
  user_id: number;
}

interface NoteCreationAttributes
  extends Optional<NoteAttributes, keyof NoteAttributes> {}

export class Note
  extends Model<NoteAttributes, NoteCreationAttributes>
  implements NoteAttributes {
  id!: number;
  name!: string;
  content!: string;
  user_id!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Note.init(
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        key: "id",
        model: "users",
      },
    },
  },
  {
    sequelize,
    modelName: "note",
  },
);
