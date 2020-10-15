"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("notes", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        unique: true,
        defaultValue: Sequelize.UUIDV4,
      },
      title: {
        type: Sequelize.STRING,
        defaultValue: "",
      },
      content: {
        type: Sequelize.TEXT,
        defaultValue: "",
      },
      favorite: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },

      userId: {
        field: "user_id",
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          key: "id",
          model: "users",
        },
      },

      createdAt: {
        field: "created_at",
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        field: "updated_at",
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("notes");
  },
};
