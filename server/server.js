const express = require('express');
const mongoose = require('mongoose');
const morgan = require("morgan");
const cors = require("cors");

mongoose.connect('mongodb://localhost:27017/food', {
    useCreateIndex: true,
    useNewUrlParser: true
});

var orderRouter = require('./api/order.js')


var app = express();
app.use(morgan("dev"));
app.use(cors());

app.use(express.json({ limit: '200mb' }));
app.use(express.static(__dirname))

app.use(express.urlencoded({
    extended: true,
    limit: '200mb'
}));


app.use('/api/order', orderRouter)


app.listen(3000, () => {
    console.log(`http://localhost:3000`);
})