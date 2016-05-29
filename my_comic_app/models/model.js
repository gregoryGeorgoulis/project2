var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	name:String,
	comics: Array
});

var User = mongoose.model('User', UserSchema);

module.exports = User;