const mongoose = require('mongoose')

const { ObjectId } = mongoose.Schema

const centroSchema = new mongoose.Schema({
    name: {
        type: String,
    }
  }
)

module.exports = mongoose.model('Centro', centroSchema)
