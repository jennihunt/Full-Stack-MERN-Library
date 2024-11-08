const mongoose = require("mongoose");

const thirdSchema =  new mongoose.Schema({ 
FirstName: String,
LastName: String,
Reason: String,
Date: String,
})
module.exports = mongoose.model("RestrictedPatrons", thirdSchema)