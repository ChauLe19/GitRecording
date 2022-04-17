const mongoose = require("mongoose");


function DataBaseConnection() {
    mongoose.connect("mongodb://localhost:27017/GitRecordings",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
    )
    
}

module.exports = {DataBaseConnection}; 