/**
 * UserController
 *
 * @description :: Server-side logic for managing users. ONLY for demo purposes
 */

const Promise = require('bluebird');

function createUser(req, res){
  req.body.token = null;
  return User.create(req.body)
    .then(user => response(req, res, 201, user))
    .catch(fire(req, res,{
      invalidAttributes: {},
    }));
}

module.exports = {
  createUser,
};
