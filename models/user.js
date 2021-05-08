const mongoose = require('mongoose');
const passportLocalongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,

    }
});
userSchema.plugin(passportLocalongoose);

const User = mongoose.model('User', userSchema);
module.exports = User;