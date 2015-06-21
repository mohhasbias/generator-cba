'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _s = require('underscore.string');

module.exports = yeoman.generators.Base.extend({
  constructor: function(){
    yeoman.generators.Base.apply(this, arguments);
    this.option('skip-install');
  },
  
  promptUser: function(){
    var done = this.async();

    console.log(yosay('Let me scaffold your angular project'));

    var prompts = [{
      name: 'appName',
      message: 'What is your app\'s name ?',
      required: true
    }];

    this.prompt(prompts, function(props){
      this.appName = props.appName;

      done();
    }.bind(this))
  },

  copyMainFiles: function(){
    var done = this.async();

    var context = {
      app_name: _s.classify(this.appName),
      app_title: this.appName
    };

    this.fs.copyTpl(
      this.templatePath('app/_app.module.js'),
      this.destinationPath('app/app.module.js'),
      context
      );

    this.fs.copyTpl(
      this.templatePath('app/_app.config.js'),
      this.destinationPath('app/app.config.js'),
      context
      );

    this.fs.copyTpl(
      this.templatePath('_index.html'),
      this.destinationPath('index.html'),
      context
      );

    this.fs.copy(
      this.templatePath('_package.json'),
      this.destinationPath('package.json')
      );

    this.fs.copy(
      this.templatePath('_bower.json'),
      this.destinationPath('bower.json')
      );

    this.fs.copy(
      this.templatePath('_gulpfile.js'),
      this.destinationPath('gulpfile.js')
      );

    done();
  },

  generateSampleModule: function(){
    this.composeWith('cba:module', {
      args: ['Sample Module']
    });
  },

  install: function(){
    if(this.options.skipInstall){
      return;
    }
    this.installDependencies();
  }
});
