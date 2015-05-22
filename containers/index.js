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
  },

  end: function () {
    this.log(yosay(
      'Add the following snippet(s) to your Vagrantfile in the config.vm.provison "docker" section'
    ));

    // Print snippets for adding container to Vagrantfile
    for (var i = 0; i < this.containers.length; i++) {
      if (this.containers[i] === 'postgres') {
        this.log('');
        this.log('# Postgres database container');
        this.log('d.build_image "/vagrant/docker/postgres", args: "-t postgres-db --rm=false"');
        this.log('d.run "postgres-db",');
        this.log('  auto_assign_name: false,');
        this.log('  args: "--name postgres-db -p 5432:5432 -v \'/var/lib/postgresql:/var/lib/postgresql\'"');
      } else if (this.containers[i] === 'phppgadmin') {
        this.log('');
        this.log('# PHP Web interface for administering postgres');
        this.log('d.build_image "/vagrant/docker/phppgadmin", args: "-t phppgadmin --rm=false"');
        this.log('d.run "phppgadmin",');
        this.log('  auto_assign_name: false,');
        this.log('  args: "--name phppgadmin --restart=always  -p 8080:80 -e POSTGRES_HOST=10.99.0.1 -e POSTGRES_DEFAULTDB=postgres"');
      }
    }
  }
});
