const express = require('express')
const app = new express()
const ejs = require('ejs')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const expressSession = require('express-session');
const flash = require('connect-flash');

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
const authMiddleware = require('./middleware/authMiddleware')
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware')
const logoutController = require('./controllers/logout')
const testController = require('./controllers/test')

app.set('view engine', 'ejs')
mongoose.connect('mongodb://0.0.0.0:27017/test', { useNewUrlParser: true });
mongoose.set('strictQuery', true);

/* declare a global variable loggedIn that will be accessible from all our EJS files. 
Because the navigation bar exist in all our EJS files, they will each have to access loggedIn to alter the navigation bar.
This is used for Conditionally Display New Post, Login and New User links
- We specify with the wildcard *, that on all requests, this middleware should be executed.
*/  
app.use(express.static('public'))
app.use(fileUpload())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(expressSession({
    secret: 'keyboard cat'
}))
app.use(flash());

global.loggedIn = null;
app.use("*", (req, res, next) => {
    console.log("session: " + req.session);
    loggedIn = req.session.userId;
    next()
});
app.use('/posts/store',validateMiddleware)

app.listen(4000, () => {
    console.log('App listening on port 4000')
})

app.get('/',homeController)
app.get('/post/:id',getPostController)
app.post('/posts/store', authMiddleware, storePostController)
app.get('/posts/new',authMiddleware, newPostController)
app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController)
app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController)
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController)
app.post('/users/login', redirectIfAuthenticatedMiddleware,loginUserController)
app.get('/auth/logout', logoutController)
//With this middleware like route, Express will go through all the routes and if it can't find one that matches, it will render the not found page.
app.use((req, res) => res.render('notfound'));