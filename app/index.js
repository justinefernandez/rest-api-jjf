    const path = require('path')
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const pg = require('pg')

const config = require('../config')
const app = express()

const pool = new pg.Pool(env || config.redisStore);

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/api/contacts', function (request, response) {
    pool.connect(function (err, client, done) {
        if (err) {
        return next(err)
        }
        client.query('SELECT * FROM contacts;', [], function (err, result) {
        done()
        if (err) {
            return next(err)
        }
        response.json(result.rows)
        })
    }) 
})

app.post('/api/contacts', function (request, response) {  
    const contacts = request.body
    pool.connect(function (err, client, done) {
      if (err) {
        return next(err)
      }
      client.query('INSERT INTO contacts (first_name, last_name, address, email_address, contact_number) VALUES ($1, $2, $3, $4, $5);', [contacts.first_name, contacts.last_name, contacts.address, contacts.email_address, contacts.contact_number], function (err, result) {
        done()
        if (err) {
          return next(err)
        }
        response.send(200)
      })
    })
  })

app.get('/api/contacts/:id',  function(request, response) {
    const id = request.params.id
    pool.connect(function (err, client, done) {
        if (err) {
        return next(err)
        }
        var query = "SELECT * FROM contacts WHERE _id = '" + id + "'";
        client.query(query, [], function (err, result) {
        done()
        if (err) {
            return next(err)
        }
        response.json(result.rows)
        })
    }) 
})

app.put('/api/contacts/:id', function(request, response) {
    const id = request.params.id
    const contacts = request.body
    pool.connect(function (err, client, done) {
        if (err) {
        return next(err)
        }
        var query = "UPDATE contacts SET first_name='"+ contacts.first_name +"', last_name='"+ contacts.last_name +"', address='"+ contacts.address +"', email_address='"+ contacts.email_address +"', contact_number='"+ contacts.contact_number +"' WHERE _id = '" + id + "'";
        client.query(query, [], function (err, result) {
        done()
        if (err) {
            return next(err)
        }
        response.send(200)
        })
    }) 
})

app.delete('/api/contacts/:id', function(request, response) {
    const id = request.params.id
    pool.connect(function (err, client, done) {
        if (err) {
        return next(err)
        }
        var query = "DELETE FROM contacts WHERE _id = '" + id + "'";
        client.query(query, [], function (err, result) {
        done()
        if (err) {
            return next(err)
        }
        response.send(200)
        })
    }) 
})

module.exports = app