const express = require('express');
const bodyParser = require('body-parser');
const { Pool, Client } = require('pg');
const config = require('../config');

const app = express();

// pools will use environment variables
// for connection information
// const pool = new Pool(config.redisStore);

const pool = new Pool({
  user: 'kkdtmoodzjiafk',
  host: 'ec2-54-235-206-118.compute-1.amazonaws.com',
  database: 'd949s1gfvq5rla',
  password: '4664df2dbd94ecd572cdcbb58d0bb8c3e26ad837f3cec078fb252bede5689128',
  port: 5432,
  ssl: true,
});
// const pool = new pg.Pool(config.redisStore);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/api/contacts', (request, response) => {
  pool.query('SELECT * FROM contacts;', (err, res) => {
    if (err) {
      response.json(err.stack);
    }
    pool.end();
    response.json(res.rows);
  });
});

app.post('/api/contacts', (request, response) => {
  const contacts = request.body;
  pool.query('INSERT INTO contacts (first_name, last_name, address, email_address, contact_number) VALUES ($1, $2, $3, $4, $5);', [contacts.first_name, contacts.last_name, contacts.address, contacts.email_address, contacts.contact_number], (err, res) => {
    if (err) {
      response.json(err.stack);
    }
    pool.end();
    response.send(200);
  });
});

app.get('/api/contacts/:id', (request, response) => {
  const { id } = request.params;
  const query = `SELECT * FROM contacts WHERE _id = '${id}'`;
  pool.query(query, (err, res) => {
    if (err) {
      response.json(err.stack);
    }
    pool.end();
    response.json(res.rows);
  });
});

app.put('/api/contacts/:id', (request, response) => {
  const { id } = request.params;
  const contacts = request.body;
  const query = `UPDATE contacts SET first_name='${contacts.first_name}', last_name='${contacts.last_name}', address='${contacts.address}', email_address='${contacts.email_address}', contact_number='${contacts.contact_number}' WHERE _id = '${id}'`;
  pool.query(query, (err, res) => {
    if (err) {
      response.json(err.stack);
    }
    pool.end();
    response.json(res.rows);
  });
});

app.delete('/api/contacts/:id', (request, response) => {
  const { id } = request.params;
  const query = `DELETE FROM contacts WHERE _id = '${id}'`;
  pool.query(query, (err, res) => {
    if (err) {
      response.json(err.stack);
    }
    pool.end();
    response.json(res.rows);
  });
});

module.exports = app;
