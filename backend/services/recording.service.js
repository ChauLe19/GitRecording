const recordingDb = require("../Models/Recording")



async function addRecording(recording) {

    const _recording = new recordingDb(recording)
    try{
        return await _recording.save()
    }catch(e){
        return e;
    }

}
module.exports = {addRecording}