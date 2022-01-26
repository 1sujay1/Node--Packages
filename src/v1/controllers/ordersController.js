
const db = require('./../../models/index');
const UserModel = db.user;

const Orders = db.order;
const Inventory = db.inventory;

const addOrders = async (req, res) => {
    try {
        const insertedData = await Orders.insertMany([
            // { product: "toothbrush", total: 4.75, customer: "Mike" },
            // { product: "guitar", total: 199.99, customer: "Tom" },
            // { product: "milk", total: 11.33, customer: "Mike" },
            // { product: "pizza", total: 8.50, customer: "Karen" },
            // { product: "toothbrush", total: 4.75, customer: "Karen" },
            // { product: "pizza", total: 4.75, customer: "Dave" },
            // { product: "toothbrush", total: 4.75, customer: "Mike" }
            { "item": "almonds", "price": 12, "quantity": 2 },
            { "item": "pecans", "price": 20, "quantity": 1 },
            { "quantity": 10 },
        ])
        return res.json({ status: true, data: insertedData })
    } catch (error) {
        return res.json({ status: false, message: [error.message] })
    }
}

const getOrders = async (req, res) => {
    try {
        // const getAllOrders = await Orders.aggregate([
        //     {
        //         $group: {
        //             _id: "$customer",
        //             products: {
        //                 $push: { product: "$product", price: "$total" },
        //             },
        //             qty: { $sum: 1 },
        //             total: { $sum: "$total" }
        //         }
        //     },
        //     {
        //         $sort: { total: -1 }
        //     },
        //     {
        //         $unwind: "$products"
        //     }
        // ])
        // const getAllOrders = await Orders.count({ product: 'toothbrush' });
        // const getAllOrders = await Orders.distinct('product');


        const getAllOrders = await UserModel.aggregate([
            {
                $lookup: {
                    from: "orders",
                    localField: "order_id",
                    foreignField: "orders_id",
                    as: "demo"
                }
            }
        ])

        return res.json({ status: true, data: getAllOrders })
    } catch (error) {
        return res.json({ status: false, message: [error.message] })
    }
}
const deleteOrders = async (req, res) => {
    try {
        const deleteOrders = await Orders.deleteMany({})

        return res.json({ status: true, data: deleteOrders })
    } catch (error) {
        return res.json({ status: false, message: [error.message] })
    }
}
const addInventory = async (req, res) => {
    try {
        const addInventory = await Inventory.insertMany([
            { "sku": "almonds", "description": "product 1", "instock": 120 },
            { "sku": "bread", "description": "product 2", "instock": 80 },
            { "sku": "cashews", "description": "product 3", "instock": 60 },
            { "sku": "pecans", "description": "product 4", "instock": 70 },
            { "sku": null, "description": "Incomplete" },
        ])

        return res.json({ status: true, data: addInventory })
    } catch (error) {
        return res.json({ status: false, message: [error.message] })
    }
}
const getInventory = async (req, res) => {
    try {
        const getInventory = await Orders.aggregate([
            {
                $lookup: {
                    from: "inventories",
                    localField: "item",
                    foreignField: "sku",
                    as: "inventory_docs"
                }
            }
        ])

        return res.json({ status: true, data: getInventory })
    } catch (error) {
        return res.json({ status: false, message: [error.message] })
    }
}


module.exports = {
    addOrders,
    getOrders,
    deleteOrders,
    addInventory,
    getInventory,
}