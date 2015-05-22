# Inherit base image
FROM postgres:9.3

# Set default superuser password
ENV POSTGRES_PASSWORD postgres

# Create the database
ADD db.sh /docker-entrypoint-initdb.d/
