const mongoose = require("mongoose");

const secondSchema =  new mongoose.Schema({

title: String,
authorFirst: String,
authorLast: String,
genre:String,
bookID:Number,
avaliable: Boolean

})
module.exports = mongoose.model("Book", secondSchema)