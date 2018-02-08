module.exports = function(req, res, next) {
  const auth = req.headers.authorization,
    authRegex = /Bearer\s+(\S+)/;

  return new Promise((resolve) => {
    let token;

    try{
      token = auth.match(authRegex);
    }catch(error){
      error.type = 'bearerUnauthorized';
      throw error;
    }
    resolve(token);
  })
    .then((token) => {
      return User.findOne({where: {token: token,}, rejectOnEmpty: true,});
    })
    .then((user) => {
      req.user = user;
      next();
    })
    .catch(fire(req, res, {
      bearerUnauthorized: {},
    }));
};
