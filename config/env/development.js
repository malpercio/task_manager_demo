
module.exports = {
  models: {
    connection: 'TaskManagerDevelopment',
    migrate: 'drop',
  },

  connections: {
    TaskManagerDevelopment: {
      host: 'dbDev',
      user: 'app',
      password: 'password',
      database: 'task_manager_dev',
      cls: 'task_manager',
      options: {
        operatorsAliases: false,
      },
    },
  },

};
