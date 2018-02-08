module.exports.routes = {
  'post /api/tasks': 'TaskController.createTask',
  'get /api/tasks/:status': 'TaskController.readTasksByStatus',
  'get /api/tasks': 'TaskController.readTasksByDescription',
  'delete /api/tasks/:id': 'TaskController.deleteTask',
  'put /api/tasks/:id': 'TaskController.updateTask',
  'post /auth': 'AuthController.createToken',
  'delete /auth': 'AuthController.deleteToken',
  'post /users': 'UserController.createUser',
};
