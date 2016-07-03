#!/usr/bin/env node
/* 
  to adjust config so like config -p 80 -> modifies config.port and writes to config.js
  to generate .bowerrc from config.bowerComponents -> { directory: config.bowerComponents }
  to add router/view/controller stub to config.routes
  to validate config module schema before allowing it to be interacted with
*/
const async = require('async');
const fs = require('fs');
const program = require('commander');
const prompt = require('prompt');

const init = require('./init');
const projectConfigModel = require('../models/projectConfigModel');

const package = require('../../package.json');

const cli = module.exports = parse;
cli.init = init;
cli.help = useage;

program.version(package.version);
prompt.start();

const opts = exports.opts = [
  ['-v, --version', program._version.toString() ],
  ['--check', 'Health check for server operability'],
  ['--config <key> <value>', 'Set config [key] [value]'],
  ['--init', 'Bootstrap server, generate any missing assets from config'],
  ['--component [type]', 'Add a server component [router|view|controller|model]'],
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
    if(!program.args.length) return console.error('Please provide a value to set for key: '+program.config);
  }
  else if(program.init) {
    // check for config
    // if none run project init
    if(!fs.existsSync(process.cwd()+'/project.json')) {
      return init();
    }    
    else {
      console.log('Found local project.json config! Validating configuration...');
      const projectConfigTest = projectConfigModel.schema.validate(require(process.cwd()+'/project.json'));
      if(projectConfigTest.error) return console.error(projectConfigTest.error);
      else return console.log('Done! Project config is valid!');
    }
    // else
    // config test
    // generate missing router, view, and controller templates
  }
  else if(program.component) {
    if(!fs.existsSync(process.cwd()+'/project.json')) return console.error('Please run node-ca with --init first!');
    const config = require(process.cwd()+'/project.json');
    const projectConfigTest = projectConfigModel.schema.validate(config);
    if(projectConfigTest.error) throw projectConfigTest.error;
    
    // interactive component adder
    switch(program.component) {
      case 'router':
        console.log('creating new '+program.component+'...');
        const collectables = {
          properties: {
            name: { required: true, message: 'Please enter a name for your router' },
            href: { message: 'Please provide an href'},
            serverController: { message: 'Please provide a serverController name' },
            clientController: { message: 'Please provide a clientController name' },
            view: { message: 'Please provide a view name' }
          }
        };
        prompt.get(collectables, function(err, results){
          if(err) throw err;
          
          const router = projectConfigModel.router.validate(results);
          if(router.error) return console.error(router.error);
          config.routers = Array.isArray(config.routers) ? config.routers : [];
          config.routers.push(router.value);
          config = projectConfigModel.schema.validate(config);
          if(config.error) return console.error(config.error);
          console.log('config',config.value.routers);
          fs.writeFileSync(process.cwd()+'/project.json', JSON.stringify(config.value, undefined, '  '), {encoding:'utf8'});
        });
        break;
      default:
        return console.error('type '+program.component+' not yet supported');
    }
    // add router
    // add view
    // add controller
    // add model
  }
  else if(program.help) return useage(program.help);
  else return useage();
}

function useage(options){
  console.log('useage',options)
  if(options) {
    // do opts stuff
    
  }
  else {
    opts.forEach((opt) => console.log(opt[0],opts[1]))
  }
}
