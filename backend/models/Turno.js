const mongoose = require('mongoose')
const Usuario = require('./Usuario')

const turnoSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  dateString: {
    type: String,
    required: true
  },
  vax: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('Turno', turnoSchema)
