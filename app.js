const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose');
const databaseconnection = require('./util/database')
require('dotenv').config()

const authRouter = require('./routes/authRoutes')
const appointmentRouter = require('./routes/appointmentsRoutes')

const app = express()

app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, '/public')))


app.use(authRouter)
app.use(appointmentRouter)

app.use((req, res) => {
  res.sendFile(path.join(__dirname, `public/pages/${req.url}`))
})

  mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error: "));
    db.once("open", () => {
      console.log("Connected successfully in app.js");
    });
  
    app.listen(4000 , () => { 
      console.log('Server is running on localhost:4000'); 
    });
  })
  .catch((err) => {
    console.log("Something went wrong with the database connection in app.js file");
  });