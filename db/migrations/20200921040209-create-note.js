"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("notes", {
      id: {
        primaryKey: true,
        unique: true,
        defaultValue: Sequelize.literal("uuid_generate_v4()"),
        type: Sequelize.UUID,
      },
      title: Sequelize.STRING,
      content: Sequelize.TEXT,
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
