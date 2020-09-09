const express = require('express');
const path = require('path');
const axios = require('axios')
const cors = require("cors")
const app = express();
const fetch = require("node-fetch");
const { profileEnd } = require('console');


app.use(cors());
app.use(express.static(path.join(__dirname, '/public')));


if (process.env.NODE_ENV === 'production') {
app.use(express.static(path.join(__dirname, 'client/build')));


app.get('*', (req,res) =>{
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});
}

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port)
