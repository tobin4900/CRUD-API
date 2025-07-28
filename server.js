// server.js

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // this serves index.html from 'public' folder

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/namesDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ Connected to mongodb');
}).catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});

// Define schema and model
const nameSchema = new mongoose.Schema({
  name: String
});

const Name = mongoose.model('names', nameSchema);

// Handle form submission
//inserting to db
app.post('/nextpage', async (req, res) => {
  const userName = req.body.name;
  //console prints
  console.log(req.body)
  console.log(req.body.name)

  try {
    const newEntry = new Name({ name: userName });
    await newEntry.save();
    res.send(`<h2>✅ Name "${userName}" saved to  database!</h2>`);
  } catch (err) {
    res.status(500).send('❌ Error saving to database');
  }
});
//searching from db sing query get
app.get('/search', async (req, res) => {
  //console prints
  console.log(req.query)
  console.log(req.query.name)
  const name = req.query.name;
  const result = await Name.findOne({ name });
  if (result) res.send('Name found!');
  else res.send('Name not found!');
});
//param search
// searching from db using route param
app.get('/search/:name', async (req, res) => {
  console.log(req.params);        // 👈 logs the entire params object
  console.log(req.params.name);   // 👈 logs just the name from URL

  const name = req.params.name;
  const result = await Name.findOne({ name });
  if (result) res.send('Name found using route param!');
  else res.send('Name NOT found using route param!');
});
//show all users
app.get('/allnames', async (req, res) => {
  try {
    const allNames = await Name.find({});
    let html = '<h2>All Names in DB:</h2><ul>';
    allNames.forEach(entry => {
      html += `<li>${entry.name}</li>`;
    });
    html += '</ul><a href="/">⬅ Back</a>';
    res.send(html);
  } catch (err) {
    res.status(500).send('❌ Error fetching names');
  }
});



// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running good at http://localhost:${PORT}`);
});
