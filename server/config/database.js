import mongoose from 'mongoose';

const config = {
    database: 'mongodb://localhost:27017/meanauth',
    secret: 'yoursecretstring'
};

// Database connection
mongoose.connect(config.database, {useMongoClient: true});

// On database connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + config.database)
});

// On database error
mongoose.connection.on('error', (err) => {
    console.log('Database connection error: ' + err)
});

module.exports = config;