const mongoose = require('mongoose');

const inventory = mongoose.model('inventory',
    new mongoose.Schema({
        sku: String,
        description: String,
        instock: Number,
    })
)
module.exports = inventory;