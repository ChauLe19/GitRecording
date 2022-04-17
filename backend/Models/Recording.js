const mongoose = require("mongoose")


const RecordingSchema = new mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    language: {
        type: String
    }
})

module.exports = mongoose.model("Recordings", RecordingSchema);
