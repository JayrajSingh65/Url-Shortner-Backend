const express = require('express');

const {connectMongoDb} = require('./connectdb')

const urlRouter = require('./routes/url')

const app = express();

const PORT = 8000;

//connect to MongoDb 

connectMongoDb('mongodb://127.0.0.1:27017/url-shortner').then(() => 
console.log('mongoDb connected')

);

app.use(express.json())

app.use('/url', urlRouter)

app.listen(PORT, () => console.log(`Running on Port ${PORT}`))

