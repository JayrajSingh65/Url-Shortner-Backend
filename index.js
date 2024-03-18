const express = require('express');
const path = require('path')

const {connectMongoDb} = require('./connectdb');

const URL = require('./models/url')
const urlRouter = require('./routes/url');
const userRouter = require('./routes/user');
const staticRoute = require('./routes/staticRouter')


const app = express();

const PORT = 8000;

//connect to MongoDb 

connectMongoDb('mongodb://127.0.0.1:27017/url-shortner').then(() => 
console.log('mongoDb connected')

);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"))

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use('/url', urlRouter);
app.use('/user', userRouter);
app.use('/', staticRoute)
app.use('/analytics/:shortId', urlRouter)
app.get('/url/:shortId', async (req, res) => {
    const shortId = req.params.shortId
    const entery = await URL.findOneAndUpdate({
        shortId
    }, {$push: {
        visitHistory: {
            timestamp: Date.now()
        }
    }});

    res.redirect(entery.redirectUrl)
})

app.listen(PORT, () => console.log(`Running on Port ${PORT}`))

