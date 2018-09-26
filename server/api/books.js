const router = require('express').Router();
const { Book } = require('../db');

// GET /api/books/
router.get('/', async (req, res, next) => {
  try {
    res.json(await Book.findAll());
  } catch (error) {
    next(error);
  }
});

// GET /api/books/:bookId
router.get('/:bookId', async (req, res, next) => {
  const { bookId } = req.params;
  try {
    const book = await Book.findById(bookId);
    res.json(book);
  } catch (error) {
    next(error);
  }
});

// POST /api/books/
router.post('/', async (req, res, next) => {
  try {
    res.status(201).json(await Book.create(req.body));
  } catch (error) {
    next(error);
  }
});

// PUT /api/books/:bookId
router.put('/:bookId', async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.bookId);
    const updatedBook = await book.update(req.body);
    res.json(updatedBook);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/books/:bookId
router.delete('/:bookId', async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.bookId);
    await book.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
