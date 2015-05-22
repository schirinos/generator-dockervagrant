# This will create a new database on container startup
gosu postgres postgres --single <<- EOSQL
    CREATE DATABASE app;
    GRANT ALL PRIVILEGES ON DATABASE app TO postgres;
EOSQL
