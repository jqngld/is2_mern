const { response } = require('express')
const bcrypt = require('bcryptjs')
const bodyParser = require('body-parser')
const Usuario = require('../models/Usuario')
const HistoriaClinica = require('../models/HistoriaClinica')
const { isDate } = require('../helpers/isDate')
const { generarJWT } = require('../helpers/jwt')
const  ObjectId = require('mongodb').ObjectId
const mongoose = require('mongoose')
const url = require('url')
const Turno = require('../models/Turno')
// const ObjectId = require('mongoose/lib/schema/objectid')
// const mongoose = require('mongoose')
// const Excercise = require('../models/Excercise')
// 6290b8402512d72f3e50e4f6

const getAllTurnosFromFecha = async (req, res = response) => {

  let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  var fecha = req.url.split('/')[2]
  let user = await Usuario.findById(ObjectId(req.url.split('/')[3]))
  let fechaQuery = fecha.replaceAll('-', '/')
  let fechx = fecha.split('-')
  let stringQuery = fechx[0] + "/" + fechx[1] + "/" + fechx[2]
  console.log('res: ', user.centro)
  console.log('res2: ', user.centro.toString())
  console.log('res3: ', ObjectId(user.centro.toString()))
  let turnosPendientes = await Turno.find({estado: 'Pendiente', centro: user.centro.toString()})
  console.log(turnosPendientes)
  let turnosReturn = []
  
  for (var i = 0; i < turnosPendientes.length; i++) {
    console.log('turnito: ', turnosPendientes[i].vax, '!', turnosPendientes[i].date.toLocaleString('es-AR').split(' ')[0]);
    if (stringQuery === turnosPendientes[i].date.toLocaleString('es-AR').split(' ')[0]) {
      turnosReturn.push(turnosPendientes[i])
    }
  }

  console.log(turnosReturn.length)

  res.json({  
    ok: true,
    listaturnos: turnosReturn
  })
}

const modificarEstado = async (req, res = response) => {

  console.log('hola?')
  const filter = { _id: req.url.split('/')[2]}
  const update = { estado: req.body.estado, observacion: req.body.obs }

  let turnoTarget = await Turno.findOne(filter)
  console.log('a', turnoTarget.vax)

  let paciente = await Usuario.findOne({email: turnoTarget.paciente}).clone()
  let filterHistoria = { _id: paciente.historiaClinica }
  await Usuario.findOneAndUpdate({email: turnoTarget.paciente}, {$pull: { turnos: { vax: turnoTarget.vax }}})

  if ( req.body.estado === "Presente") {
    if (turnoTarget.vax === "COVID19") {
      await HistoriaClinica.findOneAndUpdate(filterHistoria, { $inc: {'cantidadDosisCovid': 1}, $set: {'ultimaDosisCovid': new Date()}})
    }
    if (turnoTarget.vax === "GRIPE") {
      await HistoriaClinica.findOneAndUpdate(filterHistoria, { $set: {'ultimaDosisGripe': new Date()}})
    }
    if (turnoTarget.vax === "FIEBRE AMARILLA") {
      await HistoriaClinica.findOneAndUpdate(filterHistoria, { $set: {'ultimaDosisFiebre': new Date()}})
    }
  }

  await Turno.findOneAndUpdate(filter, update)  

  res.json({  
    ok: true
  })

}

const getTurnosPendientes = async (req, res = response) => {

  let turnosTarget = await Turno.find({estado: 'Esperando confirmación'})

  res.status(201).json({
    ok: true,
    turno: turnosTarget
  })


}

const getTurnos = async (req, res = response) => {
  var user = req.url.split('/')[1]
  console.log('hola ?? wtf ', user)

  // let info = await Usuario.findById(ObjectId(user)).exec()
  let info2 = await Usuario.findOne({ _id: user })
  console.log('ENCONTRADO :', info2.email)
  let listaTurnos = await Turno.find({paciente: info2.email})

  res.json({
    ok: true,
    turnos: listaTurnos,
  })
}

const getTurnosCompletos = async (req, res = response) => {
  var user = req.url.split('/')[2]
  console.log('hola ?? wtf ', user)

  let info2 = await Usuario.findOne({ _id: user })
  console.log('ENCONTRADO :', info2.email)
  let listaTurnosPresente = await Turno.find({paciente: info2.email, estado: 'Presente'})
  let listaTurnosAusente = await Turno.find({paciente: info2.email, estado: 'Ausente'})

  res.json({
    ok: true,
    turnosPresente: listaTurnosPresente,
    turnosAusente: listaTurnosAusente
  })
}


let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

function gripeEmpty(dni) {
  let found = dni.turnos.find(e => e.vax === "GRIPE")
  if (found === undefined) {
    return true
  }
  return false
}

function randomDate(start, end) {
  var date = new Date(+start + Math.random() * (end - start));
  return date;
}

const nuevoGripe = async (req, res = response) => {
  const { dni } = req.body
  let dni2 = await Usuario.findById(ObjectId(dni))

  console.log('n', dni2.name)
  console.log('h', dni2.historiaClinica)
  if (gripeEmpty(dni2)) {

    let nuevoTurno = new Turno({
      date: '', //randomDate(Date.now(), (Date.now()+(90*24*60*60*1000))),
      vax: "GRIPE",
      dateString: '',//date.toLocaleString('es-AR', options),
      paciente: dni2.email,
      centro: ObjectId(dni2.centro),
      estado: "Pendiente"
    })

    let historia = await HistoriaClinica.findById(ObjectId(dni2.historiaClinica))

    var ahora = new Date()
    let compDate2 = ahora - historia.ultimaDosisGripe
    console.log('a', ahora)
    console.log('b', historia.ultimaDosisGripe)
    console.log('dif', compDate2)

    if (compDate2<31556952000)
    {
      if (dni2.riesgo) {
        console.log('AAA')
        nuevoTurno.date = randomDate(new Date(historia.ultimaDosisGripe).getTime()+(365*24*60*60*1000), ((new Date(historia.ultimaDosisGripe).getTime()+(365*24*60*60*1000))+(180*24*60*60*1000)))
        nuevoTurno.dateString = nuevoTurno.date.toLocaleString('es-AR', options)
      } else {
        console.log('BBB')
        nuevoTurno.date = randomDate(new Date(historia.ultimaDosisGripe).getTime()+(365*24*60*60*1000), ((new Date(historia.ultimaDosisGripe).getTime()+(365*24*60*60*1000))+(180*24*60*60*1000)))
        nuevoTurno.dateString = nuevoTurno.date.toLocaleString('es-AR', options)
      }
    } else { 
        if (dni2.riesgo) {
          console.log('GGG')
          nuevoTurno.date = randomDate(Date.now(), (Date.now()+(90*24*60*60*1000)))
          nuevoTurno.dateString = nuevoTurno.date.toLocaleString('es-AR', options)
        } else {
          console.log('FFF')
          nuevoTurno.date = randomDate(Date.now(), (Date.now()+(180*24*60*60*1000)))
          nuevoTurno.dateString = nuevoTurno.date.toLocaleString('es-AR', options)
        }
    }

     await nuevoTurno.save()
     //dni2.turnos.push(nuevoTurno) 

  try {

    await dni2.save()

    res.status(201).json({
      ok: true,
      uid: dni2.id,
      name: dni2.name,
      turnos: dni2.turnos,
      msg: 'Turno guardado con éxito!',
    })
  } catch (e) {
    console.log(e)
    res.json({
      ok: false,
      msg: 'Error al generar nuevo turno',
    })
  }
    }

  
}

const gestionarTurno = async (req, res = response) => {

  console.log(req.body.fecha)
  let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

  const filter = { _id: req.url.split('/')[2]}
  const update = { estado: "Pendiente", date: req.body.fecha, dateString: new Date(req.body.fecha).toLocaleString('es-AR', options) }

  let turnoTarget = await Turno.findById(req.url.split('/')[2])
  console.log(turnoTarget)

  await Turno.findOneAndUpdate(filter, update)

  res.status(201).json({
    ok: true,
    msg: 'Asignaste fecha al turno exitosamente.'
  })

}

const nuevoFiebre = async (req, res = response) => {
  const { dni } = req.body
  let dni2 = await Usuario.findById(ObjectId(dni))

  function randomDate(start, end) {
    var date = new Date(+start + Math.random() * (end - start))
    return date
  }

  function fiebreEmpty(dni2) {
    let found = dni2.turnos.find((e) => e.vax === 'FIEBRE AMARILLA')
    if (found === undefined) {
      return true
    }
    return false
  }

  if (dni2) {
    let historia = await HistoriaClinica.findById(ObjectId(dni2.historiaClinica))
    console.log('id: ', historia.ultimaDosisGripe, historia.cantidadDosisCovid, '-', historia.ultimaDosisFiebre)
    if (dni2.age > 60) {
      console.log('El usuario posee más de 60 años')
      return res.status(201).json({
        ok: false,
        msg: 'El usuario posee más de 60 años',
      })
    } else {
      if (historia.ultimaDosisFiebre) {
        console.log('El usuario ya posee una vacuna contra la fiebre amarilla')
        return res.status(201).json({
          ok: false,
          msg: 'El usuario ya posee una vacuna contra la fiebre amarilla',
        })
      } else {
        let fechita = randomDate(
          Date.now(),
          Date.now() + 7 * 24 * 60 * 60 * 1000
        )
        let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
        let fechaza = fechita.toLocaleString('es-AR', options)

        let nuevoTurno = new Turno({
          date: '',
          vax: 'FIEBRE AMARILLA',
          dateString: 'Su turno está pendiente y debe ser gestionado por un administrador',
          estado: 'Esperando confirmación',
          paciente: dni2.email,
          centro: ObjectId(dni2.centro)
        })

        await nuevoTurno.save()
        //dni2.turnos.push(nuevoTurno)

        try {
          await dni2.save()

          res.status(201).json({
            ok: true,
            uid: dni2.id,
            name: dni2.name,
            turnos: dni2.turnos,
            msg: 'Turno solicitado con éxito!',
          })
        } catch (e) {
          console.log(e)
          res.json({
            ok: false,
            msg: 'Error al generar nuevo turno',
          })
        }
      }
    }}
  }

const getAllPresente = async (req, res = response) => {

    let turnos = await Turno.find({estado: "Presente"})

    res.status(201).json({
      ok: true,
      turnos: turnos
    })

}

module.exports = {
  getTurnos,
  nuevoFiebre,
  nuevoGripe,
  getAllTurnosFromFecha,
  modificarEstado,
  getTurnosPendientes,
  gestionarTurno,
  getTurnosCompletos,
  getAllPresente
}
