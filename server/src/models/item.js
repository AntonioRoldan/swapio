const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
    },
    description: {
      type: String
    },
    imgurl: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    }
})

const Item = mongoose.model('Item', itemSchema)
module.exports = Item
