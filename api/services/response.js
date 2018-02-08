const xml = require('xml');

module.exports = (req, res, status, data) => {
  if(req.accepts('xml')){
    res.set('Content-Type', 'application/xml');
    return res.status(status).send(xml(data.dataValues));
  }
  return res.status(status).json(data);
};
