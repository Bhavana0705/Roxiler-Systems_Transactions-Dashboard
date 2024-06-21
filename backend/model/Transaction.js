let mongoose=require("mongoose")
let transactionSchema=new mongoose.Schema({
    "_id":Number,
    "title": String,
    "description": String,
    "price": Number,
    "sold": Boolean,
    "category": String,
    "image":String,
    "dateOfSale":String,
    "convertdate":Date
})
module.exports = mongoose.model('productdetails', transactionSchema);