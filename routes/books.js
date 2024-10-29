// routes/books.js
const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// CRUD operations
router.get('/', bookController.getAllBooks);
router.post('/', bookController.createBook);
router.get('/:id', bookController.getBook);
router.put('/:id', bookController.updateBook);
router.delete('/:id', bookController.deleteBook);

module.exports = router;