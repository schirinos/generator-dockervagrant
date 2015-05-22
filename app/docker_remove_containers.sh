#!/usr/bin/env bash
# Helper script to clean up old docker containers.
# Since Vagrant will automatically start containers that match
# cached container ids, if you make a change to the image
# you need to run this in order to make docker start containers
# based on the new image.

# Only run script if we have docker installed
command -v docker >/dev/null 2>&1 || { echo >&2 "I require docker but it's not installed.  Aborting."; exit 0; }

# First stop all running containers
docker ps | awk '{print $1}' | grep -v CONTAINER | xargs docker stop

# Then remove all containers
docker ps -a | awk '{print $1}' | grep -v CONTAINER | xargs docker rm

# Always exit with ok status
exit 0
