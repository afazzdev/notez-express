"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Note extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
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

  return Note;
};
