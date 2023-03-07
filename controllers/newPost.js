
module.exports = (req, res) => {
    // checking for a session id before allowing a user to create a blog post
    if (req.session.userId) {
        return res.render("create");
    } 
    res.redirect('/auth/login')
}