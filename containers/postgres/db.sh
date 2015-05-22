gosu postgres postgres --single <<- EOSQL
    CREATE DATABASE blinder;
    GRANT ALL PRIVILEGES ON DATABASE blinder TO postgres;
EOSQL
