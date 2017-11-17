const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var testSchema = new Schema({

 name : String,
 class : String

})

var model = mongoose.model('testSchema', testSchema);
module.exports = model;
