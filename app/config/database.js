const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.DATABASE_URL, {});
const db = mongoose.connection;
db.on('error', (error) => console.log(error));