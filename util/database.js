require('dotenv').config()
const path = require('path')
const fs = require('fs')
const mongoose = require('mongoose');

// console.log(process.env.MONGODB_URI,"PASSWORD")

mongoose.connect("mongodb+srv://kummarikuntlashekar092:CCH97zmvxBlkDEp0@cluster0.revfsxj.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  db.once('open', () => {
    console.log('MongoDB connected in databse file.js ----->');
  });