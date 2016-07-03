const router = module.exports = function (server) {

  const app = server.app;
  const config = server.config;

  config.routers.forEach((route) => {

    if (route.href && route.method && route.serverController) {
      const method = router.method.toLowerCase();
      switch (method) {
        case 'get':
        case 'post':
        case 'put':
        case 'delete':
          app[method](route.href, require('./controllers/'+route.serverController));
          break;
      }
    }
  });

  router.catchall(server);
};

router.catchall = function (server) {

  const app = server.app;
  const config = server.config;

  app.get('*', function (req, res) {

    return res.status(404).send(config.errors.notFoundMessage);
  });
}
