require('./config/config.js');

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const { mongoose } = require('./db/mongoose');
const redirect = require('./middleware/ssl-redirect');

//Routes
const walkthroughRoutes = require('./routes/walkthrough');
const commentRoutes = require('./routes/comments');
const adduxRoutes = require('./routes/addux');
const userRoutes = require('./routes/users');
const adminRoutes = require('./routes/admin');
const stripeRoutes = require('./routes/stripe');

const app = express();
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT;

app.use(redirect());
app.use(bodyParser.json());
app.use(express.static(publicPath));

app.use(adminRoutes);
app.use(walkthroughRoutes);
app.use(commentRoutes);
app.use(adduxRoutes);
app.use(userRoutes);
app.use(stripeRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
});

module.exports = { app }