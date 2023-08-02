# Data-Stack
## React | Nodejs | Postgres
This app built in React, Node.js, Express.js and Postgres.

Replication in Postgres :
commands:
 1) CREATE ROLE replica_user WITH REPLICATION LOGIN PASSWORD : ****
 2) Next, We need to make a few tweaks to the main configuration file.
    Use your preferred text editor to access the following configuration file:
       -> sudo /etc/postgresql/14/main/postgresql.conf
3) Replace localhost with your server’s IP address.
4) In the Write Ahead Log (WAL) file
   -> set wal_level = logical
   -> wal_log_hints = on
5) Now in /etc/postgresql/14/main/pg_hba.conf:
   Append this line to file
    -> host  replication   replica_user  139.144.169.79/24   md5
6) Config the replica node by run this cmd in adminstrator mode:
   ->sudo pg_basebackup -h 194.195.208.82 -U replica_user -X stream -C -S replica_1 -v -R -W -D /var/lib/postgresql/14/main/

7) execute the following command on the replica to grant ownership of the data directory to the postgres user.
    -> sudo chown postgres -R /var/lib/postgresql/14/main/
8) Now start the PostgreSQL server.
9) Now we can create a db and test your postgres data to access with with your client application.
