const { db } = require('../app');
const books = require('../routes/books');
// create a book
const createBook = async (req, res) => {
    try{
        const newBook = req.body;
        const bookRef = await db.collection('books').add(newBook);
        res.status (201).send({ id: bookRef.id });
 } catch (error) {
     res.status(400).send(`Book could not be created: ${error}`);
 }
};

// get all books
const getAllBooks = async (req, res) => {
    try{
        const bookSnapshot = await db.collection('books').get();
        const books = booksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).send(books);
    }catch (error) {
        res.status(400).send(`Cannot get books: ${error}`);
    }
};

// get a book by id
const getBook = async (req, res) => {
    try{
        const bookId = req.params.id;
        const book = await db.collection('books').doc(bookId).get();
        if (!book.exists) {
            res.status(404).send('Book not found');
        } else {
            res.status(200).send({ id: book.id, ...book.data() });
        }
    } catch (error) {
        res.status(400).send(`Cannot get book: ${error}`);
    }
};

// update a book by id
const updateBook = async (req, res) => {
    try{
        const bookId = req.params.id;
        const updatedBook = req.body;
        await db.collection('books').doc(bookId).update(updatedBook);
        res.status(200).send('Book updated successfully');
    } catch (error) {
        res.status(400).send(`Cannot update book: ${error}`);
    }
};

// delete a book by id
const deleteBook = async (req, res) => {
    try{
        const bookId = req.params.id;
        await db.collection('books').doc(bookId).delete();
        res.status(200).send('Book deleted successfully');
    } catch (error) {
        res.status(400).send(`Cannot delete book: ${error}`);
    }
};

module.exports = {
    createBook,
    getAllBooks,
    getBook,
    updateBook,
    deleteBook
}

