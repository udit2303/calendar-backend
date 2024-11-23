'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    static associate(models) {
      // Define association: An Event belongs to a User
      Event.belongsTo(models.User, {
        foreignKey: 'userEmail',
        as: 'user', // Alias for the association
      });
    }
  }
  Event.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      time: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      endTime: {
        type: DataTypes.TIME,
        allowNull: true, // Optional
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true, // Optional
      },
      userEmail: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: 'Users', // Refers to the table name
          key: 'email',   // Refers to the column in the User table
        },
        onDelete: 'CASCADE', // Delete events if the user is deleted
      },
    },
    {
      sequelize,
      modelName: 'Event',
    }
  );
  return Event;
};
