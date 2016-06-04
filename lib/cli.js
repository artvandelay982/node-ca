/* 
  to adjust config so like config -p 80 -> modifies config.port and writes to config.js
  to generate .bowerrc from config.bowerComponents -> { directory: config.bowerComponents }
  to add router/view/controller stub to config.routes
  to validate config module schema before allowing it to be interacted with
*/
var async = require('async');
var fs = require('fs');
var program = require('commander');
var prompt = require('prompt');

var projectConfigModel = require('./projectConfigModel');

var cli = module.exports = parse;
cli.init = init;
cli.help = useage;

program.version('0.0.1');
prompt.start();

var opts = exports.opts = [
  ['-v, --version', program._version.toString() ],
  ['--check', 'Health check for server operability'],
  ['--config [key] [value]', 'Set config [key] [value]'],
  ['--init', 'Bootstrap server, generate any missing assets from config'],
  ['--component', 'Add a server component'],
  ['--help [command]', 'General usage tips. use --help [check|config|...] to get individual command useage']
];
opts.forEach( (opt) => program.option(opt[0], opt[1]) );

if(require.main === module) parse(process.argv);


function parse (argv) {
  program.parse(argv);
  main();
}

function main () {
  if(program.check) {
    // run tests
    
    // config test
    
    // startup test
    
    // route tests
  }
  else if(program.config) {
    // config test
    
  }
  else if(program.init) {
    // check for config
    // if none run project init
    if(!fs.existsSync(process.cwd()+'/project.json')) {
      return init();
    }
    
    else {
      var projectConfigTest = projectConfigModel.validate(require(process.cwd()+'/project.json'));
      if(projectConfigTest.error) return console.log(projectConfig.error);
      else return console.log('project config is valid!');
    }
    // else
    // config test
    // generate missing router, view, and controller templates
  }
  else if(program.component) {
    // interactive component adder
    
    // add router
    // add view
    // add controller
    // add model
  }
  else if(program.help) return useage(program.help);
}

function init () {
  var collectables = {
    properties: {
      name: { required: true, message: 'Please enter a name for your project' },
      port: { message: 'Please enter a port' }
    }
  };
  
  return prompt.get(collectables, function(err, results) {
    if(err) throw err;
    
    var projectConfig = projectConfigModel.validate(results);
    if(projectConfig.error) {
      var err = projectConfig.error;
      if(err.details) {
        if(Array.isArray(err.details) && err.details.length) {
          if(err.details.length === 1) {
            var details = err.details[0];
            if(details.message) console.error(new Error(details.message));
            else console.error(details);
          }
          else console.error(err.details);
        }
      }
      else console.error(err.error);
      
      return init();
    }
    fs.writeFileSync(process.cwd()+'/project.json', JSON.stringify(projectConfig.value, undefined, '  ')+'\n', { encoding: 'utf8' });
    console.log('init complete!');
  });
}

function useage(opts){
  if(opts) {
    // do opts stuff
    
  }
  else {
    
  }
}
