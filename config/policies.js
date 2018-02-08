module.exports.policies = {
  TaskController: 'bearerAuth',
  AuthController: {
    createToken: true,
    deleteToken: 'bearerAuth',
  },
  UserController: true,

};
