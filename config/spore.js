const faker = require('faker');
const moment = require('moment');

faker.locale = 'en_US';

module.exports.spore = {
  ormHook: 'fireline',
  catalogs: {
    models: ['User',],
    data: [
      {
        model: 'User',
        data: {
          id: 1,
          name: 'Daniel',
          last_name: 'González Espinoza',
          email: 'danielglezespinoza@gmail.com',
          password: 'password',
          token: 'none',
        },
      },
    ],
  },
  mainGenerator: () => {
    const tasks = [];

    for(let i = 0; i < 50; i++){
      const delta = faker.random.number({min:0,});
      const factor = faker.random.number({min:8, max:10,});
      const task = {
        model: 'Task',
        data: {
          description: faker.lorem.words(),
          user:1,
          status: 'complete',
          created_at: moment().day(i % 7).valueOf(),
          duration: delta,
        },
      };

      task.data.completed_at = parseInt(task.data.created_at + delta * factor / 10);
      tasks.push(task);
    }
    return tasks;
  },
};
