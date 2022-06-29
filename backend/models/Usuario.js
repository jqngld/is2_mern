const mongoose = require('mongoose')

// const Turno = require('./Turno').schema

const { ObjectId } = mongoose.Schema

const Usuario = new mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  lastname: {
    type: String,
    require: true,
  },
  dni: {
    type: Number,
    require: true,
    unique: true,
  },
  centro: {
    type: ObjectId,
    ref: 'Centro',
    require: true
  },
  tel: {
    type: Number,
    require: true,
  },
  date: {
    type: Date,
    require: true,
  },
  riesgo: {
    type: Boolean,
    require: false
  },
  age: {
    type: Number,
    require: true,
  },
  is_admin: {
    type: Boolean,
  },
  is_vacunador: {
    type: Boolean,
  },
  turnos: {
    type: [], 
  },
  historiaClinica: {
    type: ObjectId,
    ref: 'HistoriaClinica'
  },
  vacunasRecibidas: {
    type: []
  }
  }
)

module.exports = mongoose.model('Usuario', Usuario)
