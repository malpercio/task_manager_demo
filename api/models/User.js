/**
 * User.js
 * @description :: Model used to represent an user
 */

const bcrypt = require('bcrypt');
const Promise = require('bluebird');

hashPassword = (instance) => {
  if (!instance.changed('password')){
    return Promise.resolve();
  }
  return bcrypt.hash(instance.password, 10)
    .then((hash) => {
      instance.password = hash;
    });
};
module.exports = {
  attributes: {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        is: /(?=.*\w+.*)^[A-z ÁÉÍÓÚÜÑáéíóúüñ]+$/,
      },
    },
    last_name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        is: /(?=.*\w+.*)^[A-z ÁÉÍÓÚÜÑáéíóúüñ]+$/,
      },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: 8,
      },
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    token: {
      type: Sequelize.STRING,
    },
  },
  associations(){
    User.hasMany(Task,{
      foreignKey: {
        name: 'user',
        allowNull: false,
      },
    });
  },
  options: {
    underscored: true,
    defaultScope: {
      attributes:[
        'id',
        'name',
        'last_name',
        'email',
      ],
    },
    hooks: {
      beforeUpdate: hashPassword,
      beforeCreate: hashPassword,
    },
  },
};
