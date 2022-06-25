const mongoose = require('mongoose');

const { MONGODB_CONNECTION_STRING } = process.env;

exports.connect = () => {
    mongoose.connect(MONGODB_CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Connected to database successfully");
    }).catch((err) => {
        console.log("Database connection failed. Exiting app...");
        console.error(err);
        process.exit(1);
    });
}