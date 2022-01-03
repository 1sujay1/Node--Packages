const db = require('./../../models/index');
const Track = db.track;

const getTrack = async (req, res) => {
    try {
        const findTrack = await Track.find({ user_id: req.user._id })

        return res.status(200).json({ status: true, data: findTrack });
    } catch (error) {
        return res.status(401).json({ status: false, message: [error.message] })
    }
}

const createTrack = async (req, res) => {
    try {
        const { name, locations } = req.body;
        if (!name || !locations) return res.status(422).json({ status: false, message: ['name or locations is required'] })

        const findTrack = await Track.create({ user_id: req.user._id, name, locations });

        return res.json({ status: true, data: findTrack })

    } catch (error) {
        return res.status(401).json({ status: false, message: [error.message] })
    }
}
module.exports = {
    getTrack,
    createTrack
}