const db = require('../_helpers/database')
const Recording = db.Recording

async function addRecording(recording) {

    const _recording = new Recording(recording, { id: false })
    try {
        return await _recording.save()
    } catch (e) {
        return e;
    }
}


async function getRecording(recordingID) {
    let recording = await Recording.findOne({ _id: recordingID });
    recording.filetree = [{ name: "tutorial.js" }] // overwriting fixed value
    return recording
}

async function getAllTutorials() {
    let recording = await Recording.find({}, { name: true, description: true, image: true, title: true, _id: true });
    return recording
}


async function search(query) {
    let recording = await Recording.find({$or:[{title: new RegExp(query,'i')}, {description: new RegExp(query,'i')}]}, { description: true, image: true, title: true, _id: true });
    return recording
}


module.exports = { addRecording, getRecording, getAllTutorials, search }