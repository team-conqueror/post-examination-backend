#!/bin/bash

docker container rm postgresql
docker container rm postgresql-client-pgadmin

docker run --name postgresql -e POSTGRES_USER=neminda -e POSTGRES_PASSWORD=mypassword -p 5432:5432 -v /data:/var/lib/postgresql/data -d postgres
docker run --name postgresql-client-pgadmin -p 5050:80 -e 'PGADMIN_DEFAULT_EMAIL=neminda@gmail.com' -e 'PGADMIN_DEFAULT_PASSWORD=mypassword' -d dpage/pgadmin4
