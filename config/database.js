
module.exports = {
  models: {
    connection: 'TaskManagerDevelopment',
    migrate: 'drop',
  },

  connections: {
    TaskManagerDevelopment: {
      user: 'app',
      password: 'password',
      database: 'task_manager',
      cls: 'task_manager',
      options: {
        host: 'db',
        operatorsAliases: false,
      },
    },
  },

};
