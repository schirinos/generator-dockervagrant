#!/usr/bin/env bash
#
# This script is used as the ENTRYPOINT in the Dockerfile.
# It allows us to mutate the container into different modes.
#
# Add logic for checking arguments to the container start
# in order to change how the container runs.
# You must you `exec` command to pass of process control to the
# last executed command. Otherwise the container will have
# zombie processes.

exec /usr/sbin/apachectl -D FOREGROUND
