var express = require('express');
var router = express.Router();
const recordingsController = require("../controllers/recordings.controller")


router.get("/getaudio/:recordingID", recordingsController.getAudio)

router.post("/addrecording", recordingsController.addRecording)

router.get("/getrecording/:recordingID", recordingsController.getRecording)
router.get("/search", recordingsController.search)

router.get("/getall", recordingsController.getAllTutorials)

router.get("/checkout/:recordingID/:commithash", recordingsController.getFileWithCommitID)
router.get("/timestamp/:recordingID", recordingsController.getRepoTimestamp)

module.exports = router;
