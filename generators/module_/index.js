'use strict';
var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.argument('name', {
      required: true,
      type: String,
      desc: 'The module name'
    });

    this.log('Creating <%= generatorName %> named ' + this.name + '.');
  },

  writing: function () {
    this.fs.copy(
      this.templatePath('news_detail'),
      this.destinationPath('app/news_detail')
    );
  }
});