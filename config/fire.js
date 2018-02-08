const bluebird = require('bluebird');

module.exports.fire = {
  default: (err, req, res) => {
    return response(req, res, 500, {message: 'Unexpected error',});
  },
  handlers:{
    notFound: (err, req, res, args) => {
      if(err instanceof Sequelize.EmptyResultError){
        response(req, res, 404, {message: 'Not Found',});
        return true;
      }
    },
    bearerUnauthorized: (err, req, res) => {
      if(err instanceof Sequelize.EmptyResultError || err.type == 'bearerUnauthorized'){
        response(req, res, 401, {message: 'Bearer Unauthorized',});
        return true;
      }
    },
    invalidAttributes: (err, req, res) => {
      if(err instanceof Sequelize.ValidationError || err.type == 'invalidAttributes'){
        const responseJSON = [],
          validationFailed = /^Validation (.*) on .* failed$/;

        for(const error of err.errors){
          const failed = validationFailed.exec(error.message);

          value = error.value instanceof Error? '': '' + error.value,
          message = failed? failed[1]: 'cannot be';
          responseJSON.push({message: error.path + ' ' + message + value,});
        }
        response(req, res, 400, {errors: responseJSON,});
        return true;
      }
    },
  },
};
