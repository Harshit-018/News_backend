const mongoose = require('mongoose');

const user_scehma = new mongoose.Schema({
    headline: String,
    description: String,
    location: String,
    author: String,
})

const newsmodel = mongoose.model('news', user_scehma)
module.exports = newsmodel;