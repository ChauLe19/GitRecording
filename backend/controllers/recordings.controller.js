var fs = require('fs')
var serialize = require('node-serialize')

const simpleGit = require("simple-git");
const git = simpleGit("../../JSTutorial");

function getFileWithCommitID(req, res) {
    let commit = req.params.commithash
    let recording = req.params.file
        // git.show(`${commit}:${file}`).then(ressult => res.send({ body: ressult }))
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
    // play audio
    data = serialize.unserialize(data);
    let logs = Object.keys(data).map((key) => { return { order: Number(key), ...data[key] } });
    console.log(logs)
        // res.send("hi")
    res.json(logs);
}

module.exports = {
    getFileWithCommitID,
    getRepoTimestamp
}