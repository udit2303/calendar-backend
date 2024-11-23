'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Define association: A User has many Events
      User.hasMany(models.Event, {
        foreignKey: 'userEmail',
        as: 'events', // Alias for the association
      });
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        primaryKey: true, // Set email as the primary key
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
