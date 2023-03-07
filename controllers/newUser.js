module.exports = (req, res) => {
    var username = ""
    var password = ""
    const data = req.flash('data')[0];
    if(typeof data != "undefined"){
        username = data.username
        password = data.password
    }
    res.render('register', {
        // // Load error from session
        // errors: req.session.validationErrors

        // Load erroe from flash
        errors: req.flash('validationErrors'),
        username: username,
        password: password
    })
}