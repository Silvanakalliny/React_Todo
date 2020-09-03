const express = require('express');
const path = require('path');
const axios = require('axios')
const cors = require("cors")
const app = express();
const fetch = require("node-fetch");


app.use(cors());
app.use(express.static(path.join(__dirname, 'client/build')));

console.log(__dirname)

app.get('/api/getList', (req,res) => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
    .then(response => response.json())
    .then(data => res.send(data))
});

app.get('*', (req,res) =>{
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port)
