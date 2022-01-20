import mongoose from 'mongoose';
import app from './app.js';
//import database from './config/database.js';

const port = process.env.BACKEND_PORT;

//mongoose.connect(database.localUrl);

console.log(port);
app.listen(port);
