'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('consultations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      fullName: {
        type: Sequelize.STRING,
      },
      bornDate: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.STRING,
      },
      age: {
        type: Sequelize.STRING,
      },
      height: {
        type: Sequelize.STRING,
      },
      weight: {
        type: Sequelize.STRING,
      },
      gender: {
        type: Sequelize.STRING,
      },
      subject: {
        type: Sequelize.STRING,
      },
      liveConsult: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION',
      },
      status: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('consultations');
  },
};
