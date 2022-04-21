var fs = require('fs')
var serialize = require('node-serialize')

const simpleGit = require("simple-git");
const git = simpleGit("../../JSTutorial");
const recordingService = require("../services/recording.service")

function getFileWithCommitID(req, res) {
    let commit = req.params.commithash
    let recording = req.params.file
    // git.show(`${commit}:${file}`).then(ressult => res.send({ body: result }))
    git.show(`${commit}:${recording}`).then(result => res.json(result))
}

function getRepoTimestamp(req, res) {
    let repo = req.params.repo

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