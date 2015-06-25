## -*- docker-image-name: "registry.spotify.net:80/spotify/imagename" -*-

# Inherit base image
FROM ubuntu:trusty

# Add application files
ADD src /app/src
ADD bin /app/bin
ADD node_modules /app/node_modules
ADD package.json /app/package.json
ADD conf /app/conf

# Expose service
EXPOSE 3000

# Switch working dir
WORKDIR /app

# Add an entry point
ENTRYPOINT ["pm2", "start", "--no-daemon"]
