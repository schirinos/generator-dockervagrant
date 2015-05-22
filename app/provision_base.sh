#!/bin/bash
# Provision base for the virtual machine

env DEBIAN_FRONTEND=noninteractive
set -x

# Don't support i386 packages
dpkg --remove-architecture i386

# Set up the docker0 network bridge
echo "
auto docker0
 iface docker0 inet static
 bridge_ports none
 bridge_stp off
 bridge_fd 0
 bridge_waitport 0
 netmask 255.255.0.0
 address 10.99.0.1
" >> /etc/network/interfaces
apt-get --allow-unauthenticated install -y bridge-utils;
ifup docker0;

# Install some additional software
apt-get install -y software-properties-common git

# Set up docker to listen on 0.0.0.0:{4160, 2375} and to use the docker0 network bridge
echo "DOCKER_OPTS=\"-D=true -H=tcp://0.0.0.0:4160 -H=tcp://0.0.0.0:2375 -H=unix:///var/run/docker.sock -b=docker0\"" > /etc/default/docker

# Make docker usable by vagrant user w/o sudo
groupadd docker; gpasswd -a vagrant docker

# Automatically change to mounted /vagrant directory when
# you vagrant ssh into vm
echo "cd /vagrant" > /home/vagrant/.bash_login

# The following line terminates all ssh connections. Therefore
# Vagrant will be forced to reconnect.
# That's a workaround to make sure groupadd permissions are reset
ps aux | grep 'sshd:' | awk '{print $2}' | xargs kill
