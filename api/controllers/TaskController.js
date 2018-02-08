/**
 * TaskController
 *
 * @description :: Server-side logic for managing tasks
 */

const Promise = require('bluebird');

function createTask(req, res){
  req.body.user = req.user.id;
  return Task.create(req.body)
    .then(task => response(req, res, 201, task))
    .catch(fire(req, res,{
      invalidAttributes: {},
    }));
}

function updateTask(req, res){
  const query = {
    where: {
      id: req.params.id,
      status: 'pending',
      user:  req.user.id,
    },
    rejectOnEmpty: true,
  };

  return Task.findOne(query)
    .then((task) => {
      if(task.status == 'pending' && req.body.status == 'complete'){
        task.completed_at = Date.now();
        task.status = 'complete';
      }
      task.description = req.body.description? req.body.description: task.description;
      task.duration = req.body.duration? req.body.duration: task.duration;
      return task.save();
    })
    .then(task => response(req, res, 200, task))
    .catch(fire(req, res,{
      notFound: {},
      invalidAttributes: {},
    }));
}

function readTasksByStatus(req, res){
  const query = {
    where: {
      status:  req.params.status,
      user:  req.user.id,
    },
    rejectOnEmpty: true,
  };

  return Task.findAll(query)
    .then(task => response(req, res, 200, task))
    .catch(fire(req, res,{
      notFound: {},
      invalidAttributes: {},
    }));
}

function readTasksByDescription(req, res){
  const query = {
    where: {
      description: {
        [Op.like]: '%' + req.query.q + '%',
      },
      user:  req.user.id,
    },
    rejectOnEmpty: true,
  };

  return Task.findAll(query)
    .then(task => response(req, res, 200, task))
    .catch(fire(req, res,{
      notFound: {},
      invalidAttributes: {},
    }));
}

function deleteTask(req, res){
  const query = {
    where: {
      id: req.params.id,
      user:  req.user.id,
    },
    rejectOnEmpty: true,
  };

  return Task.findOne(query)
    .then((task) => {
      return task.destroy();
    })
    .then(task => response(req, res, 200, {}))
    .catch(fire(req, res,{
      notFound: {},
      invalidAttributes: {},
    }));
}

module.exports = {
  createTask,
  updateTask,
  readTasksByStatus,
  readTasksByDescription,
  deleteTask,
};
