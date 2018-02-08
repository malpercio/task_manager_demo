const Promise = require('bluebird');
let handlers = {},
  defaultHandler = (err, req, res) => {
    res.status(500).json({
      code: 500,
      message: 'Unexpected error',
      detailedInfo: err.message,
    });
  };

function fire(req, res, rules = {}){
  const errorHandler = (err) => {
    let errorRecognition = false,
      args,
      fx;

    for(const ruleName in rules){
      fx = handlers[ruleName];
      args = rules[ruleName];
      errorRecognition = fx(err, req, res, args);
      if(errorRecognition){
        break;
      }
    }
    if(!errorRecognition){
      defaultHandler(err, req, res);
    }
  };

  return errorHandler;
}

module.exports = (sails) => {
  return {

    configure: () => {
      if(sails.config.fire){
        handlers = sails.config.fire.handlers? sails.config.fire.handlers: handlers;
        defaultHandler = sails.config.fire.default? sails.config.fire.default: defaultHandler;
      }
    },

    initialize: (next) => {
      global.fire = fire;
      next();
    },
    handlers : handlers,
    default: defaultHandler,
  };
};
