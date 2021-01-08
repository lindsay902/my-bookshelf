const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'books',
    password: 'Grayson',
    port: 5432,
});

const getBooks = () => {
    return new Promise(function(resolve, reject) {
      pool.query('SELECT * FROM booklist ORDER BY book_id ASC', (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results.rows);
      })
    }) 
  }
  
  const createBook = (body) => {
    return new Promise(function(resolve, reject) {
      const { title, author } = body
      pool.query('INSERT INTO booklist (title, author) VALUES ($1, $2) RETURNING *', [title, author], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(`A new book has been added added: ${results.rows[0]}`)
      })
    })
  }
  const deleteBook = () => {
    return new Promise(function(resolve, reject) {
      const id = parseInt(request.params.book_id)
      pool.query('DELETE FROM booklist WHERE book_id = $1', [id], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(`Book deleted with ID: ${id}`)
      })
    })
  }
  
  module.exports = {
    getBooks,
    createBook,
    deleteBook,
  }