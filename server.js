// Import express package
const express = require('express');
const fs = require('fs');
const path = require('path');
const dataBase = require('./db/db.json');

const PORT = process.env.PORT || 3001;
// Initialize app variable by setting it to the value of express()
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Add a static middleware for serving assets in the public folder
app.use(express.static('public'));