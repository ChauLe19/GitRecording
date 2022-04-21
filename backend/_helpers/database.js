const config = require('../config.json');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || config.connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true});
//mongoose.Promise = global.Promise;

module.exports = {
    Recording: require('../models/recording.model')
};
