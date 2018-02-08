
const busboy = require('busboy-body-parser');
const parser = require('body-parser');

module.exports.http = {
  middleware: {
    order: [
      'startRequestTimer',
      'cookieParser',
      'session',
      'fileParser',
      'bodyParser',
      'handleBodyParserError',
      'compress',
      'methodOverride',
      'poweredBy',
      '$custom',
      'router',
      'www',
      'favicon',
      '404',
      '500',
    ],

    fileParser: busboy({
      multi: true,
      limit: '5mb',
    }),
    bodyParser: parser.json(),
  },
};
