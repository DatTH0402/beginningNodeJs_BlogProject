const express = require('express')
const app = new express()
const path = require('path')

app.use(express.static('public'))

const ejs = require('ejs')
app.set('view engine', 'ejs')

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const fileUpload = require('express-fileupload')
app.use(fileUpload())

//Custom Middleware
const validateMiddleWare = (req, res, next) => {
    if (req.files == null || req.body.title == null || req.body.title == null) {
        return res.redirect('/posts/new')
    }
    next()
}
app.use('/posts/store',validateMiddleWare)

const mongoose = require('mongoose');
mongoose.connect('mongodb://0.0.0.0:27017/test', { useNewUrlParser: true });
mongoose.set('strictQuery', true);

app.listen(4000, () => {
    console.log('App listening on port 4000')
})

const BlogPost = require('./models/BlogPost.js');

app.get('/', async (req, res) => {
    const blogposts = await BlogPost.find({})
    res.render('index', {
        blogposts
    });
})

app.get('/about', (req, res) => {
    //res.sendFile(path.resolve(__dirname,'pages/about.html'))
    res.render('about');
})
app.get('/contact', (req, res) => {
    //res.sendFile(path.resolve(__dirname,'pages/contact.html'))
    res.render('contact');
})

app.get('/post/:id', async (req, res) => {
    const blogpost = await BlogPost.findById(req.params.id)
    res.render('post', {
        blogpost
    })
})

app.get('/posts/new', (req, res) => {
    res.render('create')
})


app.post('/posts/store', (req, res) => {
    let image = req.files.image;
    image.mv(path.resolve(__dirname, 'public/img', image.name), async(error)=> {
        await BlogPost.create({
            ...req.body,
            image: '/img/' + image.name
        })
        res.redirect('/')
    })
})