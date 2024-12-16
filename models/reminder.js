'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Reminder extends Model {
    static associate(models) {
      Reminder.belongsTo(models.User, {
        foreignKey: 'userEmail',
        as: 'user',
      });
    }
  }

  Reminder.init(
    {
      userEmail: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'email',
        },
        onDelete: 'CASCADE',
      },
      eventTitle: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      reminderTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Reminder',
    }
  );

  return Reminder;
};
