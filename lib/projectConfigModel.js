var joi = require('joi');

var projectConfigModel = module.exports = {};
var schema = {
  name: joi.string().required(),
  port: joi.number().required()
};

var router = projectConfigModel.router = joi.object().keys({
  name: joi.string().required(),
  href: joi.string(),
  serverController: joi.string(),
  clientController: joi.string(),
  view: joi.string()
});
schema.routers = joi.array().unique(routerDeepEqual).items(router);
projectConfigModel.schema = joi.object().keys(schema);

function routerDeepEqual (a, b, defer) {
  return a.name === b.name 
    || a.href === b.href
    || a.serverController === b.serverController
    || a.clientController === b.clientController
    || a.view === b.view;
}
