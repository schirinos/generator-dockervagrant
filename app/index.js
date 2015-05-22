1'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
    this.sourceRoot(this.sourceRoot() +'/../');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the first-rate' + chalk.red('Dockerize') + ' generator!'+
      'This generator will help prepare your project for using'+
      'Docker by providing helper scripts and application templates for using Docker with'+
      'different languages and frameworks. Also provides optional Vagrantfile to spin up a local'+
      'Docker image to develop on.'
    ));

     var prompts = [{
        type: 'input',
        name: 'appname',
        message: 'What is the name of your app?',
        default: 'myapp'
      },{
        type: 'list',
        name: 'apptype',
        message: 'What kind of app are you dockerizing (this will determine the Dockerfile generated)?',
        default: 'php',
        choices: [{
          name: 'Generic',
          value: 'generic'
        },{
          name: 'Node.js',
          value: 'nodejs'
        },{
          name: 'PHP/Apache',
          value: 'php'
        }]
      },{
        type: 'checkbox',
        name: 'containers',
        message: 'Would you like any additional containers for development?',
        choices: [{
          name: 'PHP pgAdmin',
          value: 'phppgadmin'
        }, {
          name: 'Postgres',
          value: 'postgres'
        }]
      },{
        type: 'confirm',
        name: 'vagrant',
        message: 'Would you like a Vagrantfile generated for local development?',
        default: true
      }];

    this.prompt(prompts, function (props) {
      this.apptype = props.apptype;
      this.vagrant = props.vagrant;
      this.appname = props.appname;

      done();
    }.bind(this));
  },

  writing: {
    vagrant: function () {
      if (this.vagrant) {
        this.fs.copyTpl(
          this.templatePath('Vagrantfile'),
          this.destinationPath('Vagrantfile'),
          {appname: this.appname, command: this.command}
        );
      }
    },

    docker: function () {
      if (this.apptype == 'generic') {
        this.fs.copy(
          this.templatePath('Dockerfile'),
          this.destinationPath('Dockerfile')
        );
      }

      this.fs.copy(
        this.templatePath('.dockerignore'),
        this.destinationPath('.dockerignore')
      );
      this.fs.copy(
        this.templatePath('docker_removecontainers.sh'),
        this.destinationPath('scripts/docker_remove_containers.sh')
      );
    },

    provision: function () {
      this.fs.copy(
        this.templatePath('provision_base.sh'),
        this.destinationPath('scripts/provision_base.sh')
      );
      this.fs.copy(
        this.templatePath('provision_custom.sh'),
        this.destinationPath('scripts/provision_custom.sh')
      );
      this.fs.copy(
        this.templatePath('provision_after_docker.sh'),
        this.destinationPath('scripts/provision_after_docker.sh')
      );
      this.fs.copy(
        this.templatePath('provision_before_docker.sh'),
        this.destinationPath('scripts/provision_before_docker.sh')
      );
    }

    composeSubGenerator: function () {
      // Run subgenerator for the appType specified
      this.composeWith('dockerize:'+this.apptype, {arguments: this.args});

      // Run containers subgenerator
      for (var i = this.containers.length - 1; i >= 0; i--) {
        this.composeWith('dockerize:containers', {arguments: this.args});
      };
    }
  }
});
