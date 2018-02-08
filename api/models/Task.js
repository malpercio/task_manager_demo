/**
 * Task.js
 * @description :: Model used to represent a Task
 */

const bcrypt = require('bcrypt');
const Promise = require('bluebird');
const moment = require('moment');

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
    description: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    duration: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 15,
      validate: {
        min:1,
      },
    },
    completed_at: {
      type: Sequelize.DATE,
      defaultValue: null,
      allowNull: true,
    },
    status: {
      type: Sequelize.Sequelize.ENUM(['complete', 'pending',]),
      allowNull: false,
      default: 'pending',
    },
    time_taken: {
      type: Sequelize.VIRTUAL,
      get(){
        if(!this.completed_at){
          return null;
        }
        return moment(this.completed_at).valueOf() - moment(this.created_at).valueOf();
      },
    },
  },
  associations(){
    Task.belongsTo(User,{
      foreignKey: {
        name: 'user',
        allowNull: false,
      },
    });
  },
  options: {
    underscored: true,

  },
};
