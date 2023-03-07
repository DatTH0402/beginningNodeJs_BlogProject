module.exports = (req,res,next) =>{
    console.log(req.files);
    console.log(req.body);
    if(req.files == null || req.body.title == null){
        return res.redirect('/posts/new')
    }
    next()
}