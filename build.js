const pgtools = require('pgtools');
const pg = require('pg');

// Create Database
const config = {
  user: 'postgres',
  password: 'password',
  port: 5432,
  host: 'localhost'
}

const dbName = 'loginDB-01-21-2017-Attempt-1';
pgtools.createdb(config, dbName, function (err, res) {
  if (err) {
    console.log('Database already created...');
    console.log('Continuing to make login table...');
    // console.error(err);
    // process.exit(-1);
  }
  console.log(res);
});

// Connect to database
const username = 'postgres';
const password = 'password';
const connectionString = 'postgres://' + username + ':' + password + '@' 
                        + config.host + ':' + config.port + '/' + dbName;
const client = new pg.Client(connectionString);
client.connect(function (err) {
  if (err) throw err;

  // Create table for loginDB
  const createLoginTableQuery = 'CREATE TABLE users(id SERIAL PRIMARY KEY, username VARCHAR(20) NOT NULL UNIQUE, password VARCHAR(20) NOT NULL)';
  client.query(createLoginTableQuery, function (err, result) {
    if (err) throw err;

    // Print result
    console.log(result); // outputs: { name: 'brianc' }

    // Disconnect the client
    client.end(function (err) {
      if (err) throw err;
    });
  });
});