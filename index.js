const express = require('express')
const app = new express()
const path = require('path')

app.use(express.static('public'))

const ejs = require('ejs')
app.set('view engine', 'ejs')

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

const mongoose = require('mongoose');
mongoose.connect('mongodb://0.0.0.0:27017/test', {useNewUrlParser: true});
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

// // When there are a lot of  call back functions in call back function, don't use this
// // Use async await instead.
// app.post('/posts/store', (req, res) => {
//     // model creates a new doc with browser data
//     BlogPost.create(req.body, (error, blogpost) => {
//         res.redirect('/');
//         console.log(req.body);
//     })
// })

app.post('/posts/store', async (req, res) => {
    await BlogPost.create(req.body)
    res.redirect('/')
})