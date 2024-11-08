const mongoose = require("mongoose");

const thirdSchema =  new mongoose.Schema({
 
FirstName: String,
LastName: String,
BuildingName:String,//new
title: String,
authorFirst: String,
authorLast: String,
bookID:Number,
genre:String,
dueDate:String


})
module.exports = mongoose.model("CheckOutNames", thirdSchema)