const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    displayName: String,
    appId: String,
    thumbnail: String,
    provider: String
});

const User = mongoose.model('user', userSchema);

module.exports = User;
