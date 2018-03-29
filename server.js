'use strict';

//Applicaton Dependencies

const express = require('express');
const pg = require('pg');
const cors = require('cors');

// Application Setup

const app = express();
const PORT = process.env.PORT;
const CLIENT_URL = process.env.CLIENT_URL;

// Database Setup

const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('error', err => console.error(err));

// COMMENT: application middleware
app.use(cors());
//API endpoints

app.get('/api/v1/books', (req, res) => {
  client.query('SELECT book_id, title, author, image_url, isbn FROM books;')
  .then(results => res.send(results.rows))
  .catch(console.error);
});

app.get('/api/v1/books/:id', (req, res) => {
  client.query('SELECT book_id, title, author, image_url, isbn FROM books WHERE book_id=$1', [request.params.id])
  .then(results => res.send(results.rows))
  .catch(console.error);
});

app.post('/api/v1/books, (req, res) => {
  client.query(
    `INSERT INTO
      books (title, author, isbn, "image_url", description)
      VALUES ($1, $2, $3, $4, $5),

    [
      request.body.title,
      request.body.author,
      request.body.isbn,
      request.body.image_url,
      request.body.description,`
    ]
  )
  .then(function() {
    res.send('insert complete');
  })
  .catch(console.error);
}
    

// This app.get will need a lot more fleshing out once the database is operational.

app.get('*', (req, res) => res.send('It lives!'));

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));