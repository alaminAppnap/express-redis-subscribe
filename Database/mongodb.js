const mongoose = require('mongoose');

// const dbUrl = 'mongodb://localhost:27017/your-database-name';
const dbUrl = 'mongodb+srv://alamin:alamin899@cluster0.pifb15t.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});

db.once('open', () => {
    console.log('Connected to MongoDB');
});

module.exports = db;
