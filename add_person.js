const settings = require('./settings');
const knex = require('knex')({
  client: 'pg',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database
  }
})

knex.insert({
  first_name: process.argv[2], 
  last_name: process.argv[3], 
  birthdate: process.argv[4]
})
.into('famous_people')
.asCallback(function(err, rows) {
  if (err) return console.error(err);
  knex.destroy();
});

