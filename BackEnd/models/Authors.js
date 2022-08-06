const mongoose = require('mongoose');

const user_scehma2 = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    Pnumber: Number,
    address: String,
    articlesPublished: Number,
})

const authorsmodel = mongoose.model('authors', user_scehma2)
module.exports = authorsmodel;