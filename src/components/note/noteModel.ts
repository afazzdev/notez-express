import { Model, DataTypes, Optional, literal } from "sequelize";
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
      primaryKey: true,
      unique: true,
      defaultValue: literal("uuid_generate_v4()"),
      type: DataTypes.UUID,
    },
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
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
