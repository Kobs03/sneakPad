const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config()

let mongo_uri = process.env.MONGO_URI
let port = process.env.PROD_PORT

//database stuffs

const dbConnect = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/sneakPad');
        console.log('Connected to MongoDB')
    } catch (error) {
        console.error(error);
    }
}

dbConnect()

const app = express();

//cors 

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "auth-token, Origin, X-Requested-With, Content-Type, Accept");
    next();
})

// body-parser

app.use(bodyParser.json());

//routes 

// Default route

app.get('/', async (req, res) => {
    res.send("Hello World")
})

const products = require('./routes/products')

app.use('/products', products)

app.listen(port, () => {
    console.log("listening to port " + port)
})
