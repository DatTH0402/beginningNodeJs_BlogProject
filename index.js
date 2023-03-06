const express = require('express')
const app = new express()
const ejs = require('ejs')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')

const mongoose = require('mongoose')
const homeController = require('./controllers/home')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const newPostController = require('./controllers/newPost')
const validateMiddleware = require("./middleware/validationMiddleware.js")
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')

app.set('view engine', 'ejs')
mongoose.connect('mongodb://0.0.0.0:27017/test', { useNewUrlParser: true });
mongoose.set('strictQuery', true);

app.use(express.static('public'))
app.use('/posts/store',validateMiddleware)
app.use(fileUpload())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.listen(4000, () => {
    console.log('App listening on port 4000')
})

app.get('/',homeController)
app.get('/post/:id',getPostController)
app.post('/posts/store', storePostController)
app.get('/posts/new', newPostController)
app.get('/auth/register', newUserController)
app.post('/users/register', storeUserController)
app.get('/auth/login', loginController)
app.post('/users/login',loginUserController)