const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    username: { type: String }
});

// Add passport-local-mongoose plugin to handle authentication
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
