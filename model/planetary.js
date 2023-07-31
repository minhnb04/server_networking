const mongoose = require('mongoose')
const Schema = mongoose.Schema

var Planetary = new Schema({
    title: String,
    url: String,
    date: String,
})

module.exports = mongoose.model('Planetary', Planetary)