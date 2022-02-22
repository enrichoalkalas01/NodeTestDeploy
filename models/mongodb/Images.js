const Mongoose = require('mongoose')

var Schema = new Mongoose.Schema({
    imagesName: { type: String },
    typeData: { type: String },
})

const Images = Mongoose.model('images', Schema)

module.exports = Images
