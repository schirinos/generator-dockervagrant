#!/bin/bash
# Custom provisioning commands that need to be run on every `vagrant up`.
# The Vagrantfile will run this script after doing custom provisioning
# but before the Docker provisioning is done.

env DEBIAN_FRONTEND=noninteractive
set -x

# Start custom commands here
#   ex: apt-get -y install php5
