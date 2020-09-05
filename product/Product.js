var mongoose = require('mongoose');  
var ProductSchema = new mongoose.Schema({
    _id: Number,  
    name: String,
    Description: String,
    UnitPrice: mongoose.Schema.Types.Decimal128,
    Quantity: Number
});
mongoose.model('Product', ProductSchema);

module.exports = mongoose.model('Product');