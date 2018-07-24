const pg = require('pg');
const settings = require('./settings');

const client = new pg.Client ({
  user: settings.user,
  password: settings.password,
  database: settings.database,
  host: settings.hostname,
  port: settings.port,
  ssl: settings.ssl
});

let firstName = process.argv[2];
client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  } else {
    console.log("Searching...")
    query(firstName, printQueryOutput)
  }
});

function query (name, cb){
  client.query("SELECT * FROM famous_people WHERE first_name=$1::text", [name], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    cb(result.rows)
  });
}

function printQueryOutput(personResult) {
  console.log(`Found ${personResult.length} person(s) by the name '${personResult[0].first_name}'`);
  for (let i = 0; i < personResult.length; i++) {
    console.log(`- ${i + 1}: ${personResult[i].first_name} ${personResult[i].last_name}, born ${personResult[i].birthdate}`)
    }
  client.end();
}
