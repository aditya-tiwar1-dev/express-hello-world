const app = require('./app')
const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());

// Middleware to log IP
app.use((req, res, next) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log(`IP: ${ip}`);
    next();
});

// Serve static files from the current directory
app.use(express.static(__dirname));

app.post('/submit', (req, res) => {
    console.log(req.body);
    res.status(200).send('Received');
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
