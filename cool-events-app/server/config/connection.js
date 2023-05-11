
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/event_db', {
useNewUrlParser: true,
useUnifiedTopology: true,
});

const db = mongoose.connection;

// Handle connection events
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
console.log('Connected to MongoDB');
});

module.exports = mongoose.connection;



