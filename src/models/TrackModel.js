const mongoose = require('mongoose');


const PointSchema = new mongoose.Schema({
    timestamp: Number,
    coords: {
        latitude: Number,
        longitude: Number,
        altitude: Number,
        accuracy: Number,
        heading: Number,
        speed: Number
    }
})
const TrackSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name: {
        type: String,
        default: ''
    },
    locations: [PointSchema]
})

module.exports = mongoose.model("track", TrackSchema)