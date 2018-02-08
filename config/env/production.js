module.exports = {
  models: {
    connection: 'TaskManagerProduction',
    migrate: 'safe',
  },

  connections: {
    TaskManagerProduction: {
      host: 'dbDev',
      user: 'app',
      password: 'password',
      database: 'task_manager',
      cls: 'task_manager',
      options: {
        operatorsAliases: false,
      },
    },
  },

};
