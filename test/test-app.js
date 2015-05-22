'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('dockervagrant:app generic', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withOptions({'skip-install': true})
      .withPrompt({
        apptype: 'generic'
      })
      .on('end', done);
  });

  it('creates provisioning scripts', function () {
    assert.file([
      'scripts/provision_base.sh',
      'scripts/provision_custom.sh',
      'scripts/provision_after_docker.sh',
      'scripts/provision_before_docker.sh'
    ]);
  });

  it('creates Dockerfile and docker scripts', function () {
    assert.file([
      'Dockerfile',
      'scripts/docker_remove_containers.sh',
      '.dockerignore'
    ]);
  });
});

describe('dockervagrant:app with Vagrant', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withOptions({'skip-install': true})
      .withPrompt({
        vagrant: true
      })
      .on('end', done);
  });

  it('creates Vagrantfile', function () {
    assert.file([
      'Vagrantfile'
    ]);
  });
});
