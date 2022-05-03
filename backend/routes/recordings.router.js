var express = require('express');
var router = express.Router();
const simpleGit = require("simple-git");
const ms = require("mediaserver")
var path = require("path");
var recordingService = require("../services/recording.service")
const recordingsController = require("../controllers/recordings.controller")
var fs = require('fs')
// import path from 'path'
var serialize = require('node-serialize');
// const DIRECTORY = 'recordings';

const git = simpleGit("../../JSTutorial");

/* GET users listing. */
router.get('/', function (req, res, next) {
    let data = "";
    try {
        data = fs.readFileSync("recording.txt", 'utf8')
        console.log(__dirname)
        // console.log(data)
    } catch (err) {
        console.error(err)
    }

    data = serialize.unserialize(data);
    let logs = Object.keys(data).map((key) => { return { order: Number(key), commit: data[key], timestamp: 0 } });

    // res.send("hello")
    console.log(data)
    res.send(logs)
});

router.get("/play/:recording", (req, res, next) => { // don't do this in project. checkout from the frontend
    runGitCheckout()
    res.send("Done")
})

router.get("/getaudio/:recordingID", async (req, res) => {
    try{
        let recording = await recordingService.getRecording(req.params.recordingID)
        console.log(recording)
        ms.pipe(req, res, `../../${recording.localfolder}/audio.wav`); // TODO: Change JSTutorial.wav to audio.wav for convention
    }catch(err){
        res.json({err})
    }
})

//Testing
router.post("/addrecording", (req, res) => {
    console.log(req.body)
    recordingService.addRecording(req.body).then((result) => { console.log(result); res.json(result) }).catch((e) => res.json(e))
})

router.get("/getrecording/:recordingID", recordingsController.getRecording)
router.get("/search", recordingsController.search)

router.get("/getall", recordingsController.getAllTutorials)

router.get("/checkout/:recordingID/:commithash", recordingsController.getFileWithCommitID)
router.get("/timestamp/:recordingID", recordingsController.getRepoTimestamp)

module.exports = router;


async function runInit() {
    await git.init();
}

async function runLoopCommit() {
    let data = []
    console.log('Writing new recording file at: ', fileName);

    // Create write stream.
    const fileStream = fs.createWriteStream(fileName, { encoding: 'binary' });
    // Start and write to the file.
    audioRecorder.start().stream().pipe(fileStream);

    audioRecorder.stream().on('error', function () {
        console.warn('Recording error.');
    });
    setTimeout(function () {
        audioRecorder.stop();
    }, 999999);
    const initial = new Date().getTime();
    setInterval(
        async () => {
            await git
                .add("./*")
                .commit("1")
                .then((result) => {

                    if (result.summary.changes != 0) {
                        console.log(result)
                        let temp = result.commit.split(" ")
                        let commitHash = temp[temp.length - 1] // hash is always the last string
                        data.push({ "commitHash": commitHash, timestamp: new Date().getTime() - initial })
                        try {
                            fs.writeFileSync('recording.txt', serialize.serialize(data))
                            //file written successfully
                        } catch (err) {
                            console.error(err)
                        }
                    }
                    // write time to array
                })
                .catch((err) => {
                    console.log(err)
                })
        }, 500)

}

async function runGitLog() {

    return await git.log()
}

async function runGitCheckoutOnce(hash, millis) {
    return new Promise(resolve => setTimeout(() => {
        git.checkout(hash)
        resolve()
    }, millis));
}



async function runGitCheckout() { // playback
    let data = ""
    try {
        data = fs.readFileSync('recording.txt', 'utf8')
        // console.log(data)
    } catch (err) {
        console.error(err)
    }

    // play audio
    data = serialize.unserialize(data);
    let logs = Object.keys(data).map((key) => { return { order: Number(key), ...data[key] } });

    let initial = 0

    for (let log of logs) {
        console.log(log)
        await runGitCheckoutOnce(log.commitHash, log.timestamp - initial)
        initial = log.timestamp
    }

}