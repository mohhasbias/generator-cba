'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('cba:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withOptions({ skipInstall: true })
      .withPrompts({ appName: 'Great Unicorn' })
      .withGenerators([path.join(__dirname, '../generators/module')])
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'bower.json',
      'package.json',
      'gulpfile.js',
      'index.html',
      'app/app.module.js',
      'app/app.config.js',
      'app/sample_module/sample_module.module.js',
      'app/sample_module/sample_module.routes.js',
      'app/sample_module/sample_module.controller.js',
      'app/sample_module/sample_module.html'
    ]);
  });

  it('creates valid content', function(){
    assert.fileContent([
      ['app/app.module.js', 'angular.module(\'GreatUnicornApp\''],
      ['app/app.config.js', 'angular.module(\'GreatUnicornApp\''],

      ['index.html', 'data-ng-app="GreatUnicornApp"'],
      ['index.html', '<title>Great Unicorn</title>'],
      ]);
  });
});
