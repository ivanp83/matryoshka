psql -f install.sql -U postgres 
PGPASSWORD=admin psql -d mattest -f structure.sql -U admin
PGPASSWORD=admin psql -d mattest -f data.sql -U admin
# GRANT ALL PRIVILEGES ON DATABASE "mattest" TO admin;
# GRANT ALL PRIVILEGES ON SCHEMA public TO admin;
# GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO admin;
# ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON TABLES TO admin;
