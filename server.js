
const mongoose = require('mongoose');
const dotenv = require('dotenv');
process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
  });
dotenv.config({
    path: './config.env',
})

const app = require('./app');

const DB = process.env.DATABASE.replace('<PASSWORD>', encodeURIComponent(process.env.DATABASE_PASSWORD));

// var username = encodeURIComponent("aliakbar");
// var password = encodeURIComponent("Babji#07081992");

// const uri = `mongodb+srv://${username}:${password}@breadcrumbdata.r4wqlrs.mongodb.net\/?retryWrites=true&w=majority`

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
}).then(() => {
    console.log("DB Connection successful");
})

const userLocationSchema = new mongoose.Schema({
    userId: {
        type: Number,
        required: [true, 'User Location must have a user id'],
    },
    locationPunchTime: {
        type: Date,
        required: [true, 'User Location must have a locationPunchTime'],
    },
    latitude: {
        type: Number,
        required: [true, 'User Location must have a latitude'],
    },
    longitude: {
        type: Number,
        required: [true, 'User Location must have a longitude'],
    }
});
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

