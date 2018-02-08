module.exports = {
  models: {
    connection: 'TaskManagerTest',
    migrate: 'drop',
  },

  connections: {
    TaskManagerTest: {
      host: 'dbDev',
      user: 'app',
      password: 'password',
      database: 'task_manager_test',
      cls: 'task_manager',
      options: {
        operatorsAliases: false,
      },
    },
  },

};
