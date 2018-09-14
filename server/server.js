require('./config/config.js');

const express = require('express');
const path = require("path");

const mongoose = require('./db/mongoose');
const {authenticate} = require('./middleware/authenticate');

const app = express();
const publicPath = path.join(__dirname, "..", "public");
const port = process.env.PORT;

app.use(express.static(publicPath));







app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
});

module.exports = {app}