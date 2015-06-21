'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;

describe('Cba:generators/module', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/module'))
      .withArguments(['New Module'])
      .withOptions({ skipInstall: true, force: true })
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'app/new_module/new_module.module.js',
      'app/new_module/new_module.routes.js',
      'app/new_module/new_module.controller.js',
      'app/new_module/new_module.html'
      ]);
  });

  it('creates valid content', function(){
    assert.fileContent([
      ['app/new_module/new_module.module.js', 'angular.module(\'app.new_module'],
      
      ['app/new_module/new_module.routes.js', 'angular.module(\'app.new_module'],
      ['app/new_module/new_module.routes.js', 'config(setNewModuleRoute)'],
      ['app/new_module/new_module.routes.js', 'setNewModuleRoute.$inject'],
      ['app/new_module/new_module.routes.js', 'setNewModuleRoute($stateProvider)'],
      ['app/new_module/new_module.routes.js', '.state(\'new_module\''],
      ['app/new_module/new_module.routes.js', 'url: \'/new_module\''],
      ['app/new_module/new_module.routes.js', 'templateUrl: \'app/new_module/new_module.html\''],
      ['app/new_module/new_module.routes.js', 'controller: \'newModuleController\''],
      
      ['app/new_module/new_module.controller.js', 'angular.module(\'app.new_module'],
      ['app/new_module/new_module.controller.js', '.controller(\'newModuleController\', newModuleController)'],
      ['app/new_module/new_module.controller.js', 'newModuleController.$inject'],
      ['app/new_module/new_module.controller.js', 'newModuleController($state)'],
      
      ['app/new_module/new_module.html', 'view part of <strong>new_module</strong>']
      ]);
  });
});
