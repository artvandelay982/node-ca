const async = require('async');
const projectConfigModel = require('../models/projectConfigModel');

module.exports = function init () {
  const collectables = {
    properties: {
      name: { required: true, message: 'Please enter a name for your project' },
    }
  };
  
  return prompt.get(collectables, function(err, results) {
    if(err) throw err;
    
    const projectConfig = projectConfigModel.schema.validate(results);
    if(projectConfig.error) {
      handleError(projectConfig.error);
      return init();
    }
    else {
      handleTasks(projectConfig.value, function (err, project) {
        if(err) throw err;
        
        write(project);
        console.log('init complete!');
      });
    }
  });
};

function handleTasks (project, cb) {
  return async.waterfall([
    function (cb) { return addRoutes(project, cb); },
    function (cb) { return addModels(project, cb); }
  ], function (err, project){
    if(err) throw err;
    
    return cb(null, project);
  });
}

function addRoutes (project, cb) {
  const collectables = {
    properties: {
      routes: { message: 'Would you like to add any routes? (y/n)' }
    }
  };
  
  return prompt.get(collectables, function(err, results) {
    if(err) throw err;
    
    if(typeof results.routes === 'string' && results.routes.toLowerCase() === 'y') {
      
    }
  });
}
function addRoute (project, cb) {
  const collectables = {
    properties: {
      name: { message: 'Please enter a name for this router'},
      href: { message: 'Please enter a name for this router\'s href' },
      method: { message: 'Please enter a name for this method (GET,PUT,POST,DELETE)' },
      serverController: { message: 'Please enter a name for this router\'s server controller' },
      clientController: { message: 'Please enter a name for this router\'s client controller' },
      view: { message: 'Please enter a name for this router\'s view template' }
    }
  };
  
  return prompt.get(collectables, function(err, results) {
    if(err) throw err;
    
    const route = projectConfigModel.router.validate(results);
    if(route.error) {
      handleError(route.error);
      return addRoute(project, cb);
    }
    else {
      console.log(route, project);
      process.exit(1);
    }
  });
}

function addModels (project, cb) {
  const collectables = {
    properties: {
      models: { message: 'Would you like to add any models? (y/n)' }
    }
  };
  
  return prompt.get(collectables, function(err, results) {
    if(err) throw err;
    
    if(typeof results.models === 'string' && results.models.toLowerCase() === 'y') {
      
    }
  });
}

function write (project) {
  return fs.writeFileSync(process.cwd()+'/project.json', JSON.stringify(project, undefined, '  ')+'\n', { encoding: 'utf8' });
}

function handleError (err) {
  if(err.details) {
    if(Array.isArray(err.details) && err.details.length) {
      if(err.details.length === 1) {
        const details = err.details[0];
        if(details.message) console.error(new Error(details.message));
        else console.error(details);
      }
      else console.error(err.details);
    }
  }
  else console.error(err.error);
}
