const joi = require('joi');

const projectConfigModel = module.exports = {};
const schema = {
  name: joi.string().required(),
  port: joi.number().required().default(8080),
  errors: joi.object().keys({
    notFoundMessage: joi.string().default('Resource not found')
  })
};

const router = projectConfigModel.router = joi.object().keys({
  name: joi.string().required(),
  href: joi.string().required(),
  method: joi.string().lowercase().allow('get','post','put','delete').required(),
  serverController: joi.string().required(),
  clientController: joi.string(),
  view: joi.string()
});
schema.routers = joi.array().unique(routeIsEqual).items(router);
projectConfigModel.schema = joi.object().keys(schema);

function routeIsEqual (a, b, defer) {
  
  return a.name === b.name
    || (a.href === b.href && a.method === b.method);
}
