
const BlogPost = require('../models/BlogPost.js')
module.exports = async (req, res) => {
    const blogposts = await BlogPost.find({}).populate('userid'); //.populate('userid') automatically references the specified document with the userid in the collection.
    res.render('index', {
        blogposts
    });
}