const User = require('../models/User.js')
const path = require('path')
module.exports = (req, res) => {
    User.create(req.body, (error, user) => {
        if (error) {
            // the Object.keys() method is used to extract an array of all keys from a given object.
            const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message)
            // //req.session store error in session, so, error can not be clear in the next request
            // req.session.validationErrors = validationErrors
            // Instead, we can use connect-flash to flush error after first request.
            req.flash('validationErrors',validationErrors)
            req.flash('data',req.body) // to store user input, the users don't need to retype after an error occrur.
            return res.redirect('/auth/register')
        }
        res.redirect('/')
    })
}