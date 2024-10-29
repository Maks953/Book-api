// app.js
const express = require('express');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

//Initialize firebase admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://console.firebase.google.com/project/books-api-project-3ef5d/firestore/databases/-default-/data'
    });

const app = express();
const db = express();
// middleware for parsing JSON
app.use(express.json());
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);   
});

module.exports = { app, db };

// app.js
const bookRoutes = require('./routes/books');
app.use('/api/books', bookRoutes);
