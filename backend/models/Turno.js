const mongoose = require('mongoose')
const ObjectId = require('mongoose/lib/schema/objectid')
const Usuario = require('./Usuario')

const turnoSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: false,
  },
  dateString: {
    type: String,
    required: true
  },
  vax: {
    type: String,
    required: true,
  },
  paciente: {
    type: String,
    required: true
  },
  estado: {
    type: String
  },
  observacion: {
    type: String
  },
  centro: {
    type: ObjectId,
    ref: 'Centro'
  }
})

module.exports = mongoose.model('Turno', turnoSchema)
