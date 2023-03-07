const mongoose = require('mongoose')
const Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true,'Please provide username'],
        unique: true
    },
    password: {
        type: String,
        required: [true,'Please provide password']
    }
});
UserSchema.plugin(uniqueValidator);

/*
-   UserSchema.pre( ‘ save ’… , we tell Mongoose that before we save any record into the Users schema or Users collection, 
    execute the function passed into the 2nd argument. This lets us change user data before saving it into the database.
-   Note that we have to specify function(next) instead of using the lambda short form of a function i.e. next => {…} . 
    I am not too sure why the lambda short form doesn ’ t work.
-   mongoose makes the UserSchema available via this.
-   We then proceed to call bcrypt.hash whose first argument takes in the password to be hashed. 
    The second argument specifies the number of roundsof hashing to take place. 
    For example, we have specified 10 which means that the password will be encrypted 10 times. 
-   user.password = hash replaces the original password with its encrypted version.
-   We then call next() so that mongoose can continue creating the user data.
*/
UserSchema.pre('save', function (next) {
    const user = this
    bcrypt.hash(user.password, 10, (error, hash) => {
        user.password = hash
        next()
    })
})

// export model
const User = mongoose.model('User', UserSchema);
module.exports = User