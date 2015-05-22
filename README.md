Docker-Vagrant
==============

This repo contains files to help create docker images to turn your application into a service container. 
It also has base Vagrantfiles to setup a local dev environment for your containers.
The repo is also a [Yeoman](http://yeoman.io) generator. You can use the generator to
copy the needed files automatically to your project directory.

## Getting Started
There are two ways to use this repo. 

1. Install as a yeoman generator to automatically copy all files
```sh
$ npm install -g generator-dockerize
 ```
2. Clone and copy the files needed manually

Its recommended to use option 1 (see the [what-is-yeoman?](#what-is-yeoman) section for more info). But if you don't want to get involved with node and npm option 2 is available. 

## Generators
Generators are organized into different folders. The base generator is in the **app** folder.

### app
Basic files for a Docker/Vagrant setup

- **.dockerignore** - a basic docker ignore file to get you started
- **Dockerfile** - generic Dockerfile for any application type
- **Vagrantfile** - if you answer yes to using Vagrant this file will get you started with a VM setup with 
docker and install your image on it (recommended)
- **docker_removecontainers.sh** - helper script for Vagrant vm to cleanup image when restarting/reloading vm
- **provision_base.sh** - configures the Vagrant vm with basic defaults for docker
- **provision_custom.sh** - a place to put custom install instructions for the Vagrant vm
- **provision_before_docker.sh** - custom provisioning instructions before running Docker provisioning
- **provision_after_docker.sh** - custom provisioning instructions after running Docker provisioning

### nodejs
Dockerfile and a few config files for a nodejs application container.

### php
Dockerfile and a few config files for a PHP/Apache application container.

## What is Yeoman?

Trick question. It's not a thing. It's this guy:

![](http://i.imgur.com/JHaAlBJ.png)

Basically, he wears a top hat, lives in your computer, and waits for you to tell him what kind of application you wish to create.

Not every new computer comes with a Yeoman pre-installed. He lives in the [npm](https://npmjs.org) package repository. You only have to ask for him once, then he packs up and moves into your hard drive. *Make sure you clean up, he likes new and shiny things.*

```bash
npm install -g yo
```

### Yeoman Generators

Yeoman travels light. He didn't pack any generators when he moved in. You can think of a generator like a plug-in. You get to choose what type of application you wish to create, such as a Backbone application or even a Chrome extension.

To install generator-dockerize from npm, run:

```bash
npm install -g generator-dockerize
```

Finally, initiate the generator:

```bash
yo dockerize
```

### Getting To Know Yeoman

Yeoman has a heart of gold. He's a person with feelings and opinions, but he's very easy to work with. If you think he's too opinionated, he can be easily convinced.

If you'd like to get to know Yeoman better and meet some of his friends, [Grunt](http://gruntjs.com) and [Bower](http://bower.io), check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).


## License

MIT
