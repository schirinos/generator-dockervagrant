'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');

    // Change template source from default of ./templates
    // to the sub generator root directory.
    this.sourceRoot(this.sourceRoot() +'/../');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the first-rate ' + chalk.red('Dockerize') + ' generator!'+
      'This sub-generator will add helpful docker containers to help your development.'
    ));

     var prompts = [{
        type: 'checkbox',
        name: 'containers',
        message: 'What containers do you want to install',
        choices: [{
          name: 'Postgres',
          value: 'postgres'
        },{
          name: 'PHPpgAdmin',
          value: 'phppgadmin'
        }]
      }];

    this.prompt(prompts, function (props) {
      this.containers = props.containers;
      done();
    }.bind(this));
  },

  writing: {
    container: function () {
      // Copy every selected container's folder contents
      for (var i = 0; i < this.containers.length; i++) {
        this.directory(this.containers[i], path.join('docker', this.containers[i]));
      };
    }
  }
});
