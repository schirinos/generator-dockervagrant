## -*- docker-image-name: "registry.spotify.net:80/spotify/app" -*-

# Inherit base image
FROM ubuntu:trusty

# Install dependencies
ENV DEBIAN_FRONTEND noninteractive
RUN apt-get update && apt-get install -y apache2 php5 libapache2-mod-php5 php-apc php5-cgi php5-cli php5-sqlite php5-pgsql php5-curl

# Apache configuration
RUN a2enmod rewrite
RUN a2enmod php5
RUN a2enmod ssl
RUN a2enmod headers

# Application files
ADD src /app/src
ADD vendor /app/vendor
ADD migrations /app/migrations
ADD resources /app/resources
ADD scripts /app/scripts
ADD package.json /app/package.json

# Apache application specific config
ADD conf/apache/ports.conf /etc/apache2/ports.conf
ADD conf/apache/apache2.conf /etc/apache2/apache2.conf
ADD conf/apache/app.conf /etc/apache2/sites-available/app.conf
RUN ln -s /etc/apache2/sites-available/app.conf /etc/apache2/sites-enabled/app.conf

# PHP Application configuration for various environments
# this container might run in.
#ADD conf/app-next.ini /etc/app/app-next.ini
#ADD conf/app-production.ini /etc/app/app-production.ini

# Override CMD so it doesn't conflict with entry point
CMD []

# Use entrypoint script to customize container start
ENTRYPOINT ["/app/scripts/entrypoint.sh"]
