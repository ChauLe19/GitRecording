const mongoose = require("mongoose")

// const TimestampSchema = new mongoose.Schema({
//     order: { type: Number },
//     commitHash: { type: String },
//     timestamp: { type: Number }
// })

const FiletreeSchema = new mongoose.Schema();
FiletreeSchema.add({
    name: { type: String },
    subfolders: [FiletreeSchema]
    // subfolders: [FiletreeSchema]
})


const RecordingSchema = new mongoose.Schema({
    title: { type: String },
    description: { type: String },
    image: { type: String },
    filetree: {
        type: [FiletreeSchema]
    },
    timestamps: {
        type: [{
            order: { type: Number },
            commitHash: { type: String },
            timestamp: { type: Number }
        }]
    },
    localfolder: { type: String }
})

RecordingSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model("Recording", RecordingSchema);
