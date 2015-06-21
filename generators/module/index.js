'use strict';
var yeoman = require('yeoman-generator'),
  _s = require('underscore.string'),
  falafel = require('falafel'),
  fs = require('fs');

module.exports = yeoman.generators.Base.extend({
  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);

    this.argument('name', {
      required: true,
      type: String,
      desc: 'The module name'
    });

    // this.log('Generating module ' + this.name + '.');
  },

  copyScaffold: function () {
    var context = {
      module_name: _s.underscored(this.name),
      controller_name: _s.decapitalize(_s.camelize(this.name)),
      route_function_name: _s.capitalize(_s.camelize(this.name))
    };

    // this.log(context);

    var dirname = 'app/' + context.module_name;
    var baseFilename = context.module_name;

    this.fs.copyTpl(
      this.templatePath('module/_module.module.js'),
      this.destinationPath(dirname + '/' + baseFilename + '.module.js'),
      context
    );

    this.fs.copyTpl(
      this.templatePath('module/_module.routes.js'),
      this.destinationPath(dirname + '/' + baseFilename + '.routes.js'),
      context
    );

    this.fs.copyTpl(
      this.templatePath('module/_module.controller.js'),
      this.destinationPath(dirname + '/' + baseFilename + '.controller.js'),
      context
    );

    this.fs.copyTpl(
      this.templatePath('module/_module.html'),
      this.destinationPath(dirname + '/' + baseFilename + '.html'),
      context
    );
  },

  wiring: function(){
    var app_src = fs.readFileSync(this.destinationPath('app/app.module.js')).toString();

    // this.log(app_src);

    var this_generator = this;

    var update = false;
    var output = falafel(app_src, function(node){
      if(node.type === 'ArrayExpression'){
        // this_generator.log(node.source());

        var inject = eval(node.source());
        // this_generator.log(inject);

        var module_name = 'app.' + _s.underscored(this_generator.name);
        // this_generator.log('checking: ' + module_name);
        if(inject.indexOf(module_name) === -1){
          // this_generator.log('adding: ' + module_name);
          inject.push(module_name);

          var array_stringify = 
            '[\r\n    ' + 
            inject.map(function(elm){
              return '\'' + elm + '\''
            }).join(',\r\n    ') + 
            '\r\n  ]';
          // this_generator.log(array_stringify);
          node.update(array_stringify);
          update = true;
        }
        // this_generator.log(inject);
      }
    });

    if(update){
      this.log(output);
      this.fs.write(this.destinationPath('app/app.module.js'), output.toString());
    }
  }
});
