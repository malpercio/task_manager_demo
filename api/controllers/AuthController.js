/**
 * AuthController
 *
 * @description :: Server-side logic for managing authentication
 */

const bcrypt = require('bcrypt');
const Promise = require('bluebird');
const crypto = require('crypto');

function getSecret(){
  return crypto.randomBytes(32).toString('hex');
}

function createToken(req, res){
  req.body.password = req.body.password? req.body.password: '';
  req.body.email = req.body.email? req.body.email: '';
  const query = {
    where: {
      email: req.body.email,
    },
    attributes:{
      include: ['password',],
    },
    rejectOnEmpty: true,
  };

  return User.findOne(query)
    .then((user) => {
      return new Promise((resolve, reject) => {
        bcrypt.compare(req.body.password, user.password, (err, value) => {
          if(err || !value){
            const error = new Error('Wrong password');

            error.type = 'bearerUnauthorized';
            return reject(error);
          }
          return resolve(user);
        });
      });
    })
    .then((user) => {
      user.token = getSecret();
      return user.save();
    })
    .then((user) => {
      const responseJSON = {
        token: user.token,
        user: {
          name: user.name,
          last_name: user.last_name,
          email: user.email,
        },
      };

      response(req, res, 200, responseJSON);
    })
    .catch(fire(req, res, {
      notFound: {},
      bearerUnauthorized: {},
    }));
}

function deleteToken(req, res){
  req.user.token = null;
  return req.user.save()
    .then(_ => response(req, res, 200, {}))
    .catch(fire(req, res, {}));
}

module.exports = {
  createToken,
  deleteToken,
};
