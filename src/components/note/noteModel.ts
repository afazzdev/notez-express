import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../../config/sequelize";

interface NoteAttributes {
  id: string;
  title: string;
  content: string;
  favorite: boolean;
  userId: string;
}

interface NoteCreationAttributes
  extends Optional<NoteAttributes, keyof NoteAttributes> {}

export class Note
  extends Model<NoteAttributes, NoteCreationAttributes>
  implements NoteAttributes {
  id!: string;
  title!: string;
  content!: string;
  favorite!: boolean;
  userId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Note.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      unique: true,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    content: {
      type: DataTypes.TEXT,
      defaultValue: "",
    },
    favorite: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    userId: {
      field: "user_id",
      type: DataTypes.UUID,
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
    underscored: true,
  },
);
