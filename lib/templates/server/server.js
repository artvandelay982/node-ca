const express = require('express');

const server = module.exports = start;
const app = server.app = express();
const config = server.config = require('./config');
const router = server.router = require('./router');

function start () {
  
  router(server);
  app.listen(config.port, (err) => {
    
    if (err) throw err;
    console.log('Server listening on port ' + config.port);
  });
}
