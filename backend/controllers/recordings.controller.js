var fs = require('fs')
var serialize = require('node-serialize')

const simpleGit = require("simple-git");
const recordingService = require("../services/recording.service")

async function getFileWithCommitID(req, res) {
    let commit = req.params.commithash
    let recording = req.query.file
    let recordingID = req.params.recordingID
    // git.show(`${commit}:${file}`).then(ressult => res.send({ body: result }))
    let recordingInfo = await recordingService.getRecording(recordingID); // TODO: maybe use local folder as params instead of recordingID
    
    const git = simpleGit(`../../${recordingInfo.localfolder}`);
    try{
        git.show(`${commit}:${recording}`).then(result => res.json(result)).catch(err => res.json(""))
    }catch(err){
        res.status(400).json({err})
    }
}

function getRepoTimestamp(req, res) {

    let data = ""
    try {
        data = fs.readFileSync('recording.txt', 'utf8')

    } catch (err) {
        console.error(err)
    }
    data = serialize.unserialize(data);
    let logs = Object.keys(data).map((key) => { return { order: Number(key), ...data[key] } });
    console.log(logs)
    res.json(logs);
}

function getRecording(req, res) {
    let recordingID = req.params.recordingID;
    recordingService.getRecording(recordingID)
        .then(response => res.json(response))
        .catch(err => res.status(400).json({ message: err }))
}

function getAllTutorials(req, res) {
    recordingService.getAllTutorials()
        .then(response => res.json(response))
        .catch(err => res.status(400).json({ message: err }))
}

function search(req, res) {
    recordingService.search(req.query.query)
        .then(response => res.json(response))
        .catch(err => res.status(400).json({ message: err }))
}

module.exports = {
    getFileWithCommitID,
    getRepoTimestamp,
    getRecording,
    getAllTutorials,
    search
}