const config = module.exports = {
  name: 'ca-template-server',
  port: 3000,
  errors: {
    notFoundMessage: 'Resource Not Found'
  },
  routers: [{
    name: 'template-route',
    href: '/',
    method: 'get',
    serverController: 'templateController',
    clientController: 'templateController',
    view: 'templateView'
  }]
};
