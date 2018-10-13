var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    email: { type: String, unique: true, required: true },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    createdDate: { type: Date, default: Date.now }
});

//schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('user', schema);
