const mongoose = require('mongoose');

const OrdersSchema = new mongoose.Schema({
    product: String,
    total: Number,
    customer: String,
    orders_id: String,
    item: String,
    price: Number,
    quantity: String,
})

module.exports = mongoose.model('orders', OrdersSchema)