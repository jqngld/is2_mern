const Usuario = require('../models/Usuario.js')
const Centro = require('../models/Centro.js')
const HistoriaClinica = require('../models/HistoriaClinica')
const bcrypt = require('bcryptjs')
const { ObjectId } = require('mongodb');
// const ObjectId = require('mongoose/lib/schema/objectid.js')

exports.create = (req, res) => {
  const user = new Usuario(req.body)
  user.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: 'Something went wrong',
      })
    }
    res.json({ data })
  })
}

const getUserDNI = async (req, res = response) => {

  let pac = await Usuario.findOne({dni: req.body.dni})
  if (!pac) {
    return res.status(400).json({
      ok: false,
      msg: 'No existe el paciente.'
    })
  }
  console.log(pac.historiaClinica)
  let historia = await HistoriaClinica.findById(ObjectId(pac.historiaClinica))
  
  try {
    res.status(201).json({
      ok: true,
      pacientes: [pac],
      historia: historia,
    }) 
  } catch (error) {
      console.log(error)
      res.status(500).json({
          ok: false,
          msg: 'Por favor hable con el administrador',
      })
  }
}

const usuarioRegistradoPorVac = async (req, res = response) => {
  
  const { name, lastname, dni, email, date, password, centro } = req.body

  console.log('CENTRO ERC: ', req.body.centro )

  if (name.trim() == '' || lastname.trim() == '') {
    return res.status(400).json({
      ok: false,
      msg: 'El nombre o apellido deben contener caracteres',
    })
  }

  try {

    console.log('HOLAAA: ', req.body.email)
    let usuario = await Usuario.findOne({email: email}).exec()

    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: 'Ya existe un usuario con ese email',
      })
    }

    let dni2 = await Usuario.findOne({ dni: dni }).exec()

    if (dni2) {
      return res.status(400).json({
        ok: false,
        msg: 'Ya existe un usuario con el mismo DNI',
      })
    }
  
    function getAge(_date) {
      console.log(_date)
      var today = new Date()
      var birthDate = new Date(_date)
      var age = today.getFullYear() - birthDate.getFullYear()
      return age
    }

    let edad = getAge(date)

    function getRiesgo(age) {
      if (age > 60) return true
      return false
    }

    const usernuevo = new Usuario({
      email: req.body.email,
      name: req.body.name,
      dni: req.body.dni,
      lastname: req.body.lastname,
      tel: req.body.tel,
      date: req.body.date,
      password: req.body.password,
      age: edad,
      riesgo: getRiesgo(edad),
      turnos: [],
      centro: req.body.centro,
      historiaClinica: null,
      is_vacunador: false
    })

    const salt = bcrypt.genSaltSync()
    usernuevo.password = bcrypt.hashSync(req.body.password, salt)

    await usernuevo.save()

    res.status(201).json({
      ok: true,
      uid: usernuevo.id,
      name: usernuevo.name,
      is_admin: usernuevo.is_admin,
      msg: 'Paciente registrado con éxito'
    })
  } catch (error) {
    console.log(error)
    console.log('entra2 ')
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador',
    })
  }
}  

const getHistoria = async (req, res = response) => {

  var user = req.url.split('/')[2]
  let info2 = await Usuario.findOne({ _id: user })
  console.log(user)
  let historia = await HistoriaClinica.findById(ObjectId(info2.historiaClinica))
  console.log(info2.name, info2.historiaClinica, historia._id)

  res.json({
    risk: info2.risk,
    cantCovid: historia.cantidadDosisCovid,
    ultCovid: historia.ultimaDosisCovid,
    ultGripe: historia.ultimaDosisGripe,
    ultFiebre: historia.ultimaDosisFiebre
  })

}

  const getPerfil = async (req, res = response) => {

    var user = req.url.split('/')[1]
    let info = await Usuario.findOne({ _id: user })
    console.log(info.email)
    let centroFetch = await Centro.findById(ObjectId(info.centro))
  
    res.json({
      email: info.email,
      name: info.name,
      lastname: info.lastname,
      password: info.password,
      dni: info.dni,
      tel: info.tel,
      date: info.date,
      age: info.age,
      is_vacunador: info.is_vacunador,
      is_admin: info.is_admin,
      centro: centroFetch.name,
    })
  }

  function validateEmail(email) 
{
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

const modificarMail = async (req, res = response) => {
  console.log('SE RECIBIO: !!!! ', req.body.email)
  var user = req.url.split('/')[2]
  let info2 = await Usuario.findById(ObjectId(user));
  if (!validateEmail(req.body.email)) {
    return res.status(400).json({
      ok: false,
      msg: 'El formato del mail no es válido'
    })
  }
  if (req.body.email) {
    if (await Usuario.findOne({ "email": req.body.email })) {
      return res.status(400).json({
       ok: false,
       msg: 'Ya existe ese e-mail en el sistema'
     })
   }
  }
  try {
    Usuario.updateOne({ "_id": ObjectId(user)}, {$set: {"email": req.body.email}}, function(err, res)  
    {
      if (err) throw err; console.log("yass")
    })
    res.status(201).json({
      ok: true,
      name: info2.name,
      lastname: info2.lastname,
      tel: info2.tel,
      date: info2.date,
      password: info2.password
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador',
    })
  }
}

const modificarCentro = async (req, res = response) => {
  console.log('SE RECIBIO: !!!! ', req.body.centro)
  var user = req.url.split('/')[2]
  let info2 = await Usuario.findById(ObjectId(user));
  let centroTarget = await Centro.findOne({_id: ObjectId(req.body.centro)})
  try {
    Usuario.updateOne({ "_id": ObjectId(user)}, {$set: {"centro": ObjectId(centroTarget._id)}}, function(err, res)  
    {
      if (err) throw err; console.log("yass")
    })
    res.status(201).json({
      ok: true,
      name: info2.name,
      lastname: info2.lastname,
      tel: info2.tel,
      date: info2.date,
      password: info2.password
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador',
    })
  }
}

const modificarPassword = async (req, res = response) => {
  console.log('SE RECIBIO: !!!! ', req.body.password)
  var user = req.url.split('/')[2]
  let info2 = await Usuario.findById(ObjectId(user));
  const salt = bcrypt.genSaltSync()
  let pw = bcrypt.hashSync(req.body.password, salt)
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return res.status(400).json({
       ok: false,
       msg: 'La contraseña debe tener un mínimo de 6 caracteres'
     })
   }
  }
  try {
    Usuario.updateOne({ "_id": ObjectId(user)}, {$set: {"password": pw}}, function(err, res)  
    {
      if (err) throw err; console.log("yass")
    })
    res.status(201).json({
      ok: true,
      name: info2.name,
      lastname: info2.lastname,
      tel: info2.tel,
      date: info2.date,
      password: info2.password
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador',
    })
  }
}

const vacunarPaciente = async (req, res = response) => {

  const { paciente, historia } = req.body
  console.log(paciente)
  console.log(historia)

  if (!paciente || !historia) {
    return res.status(400).json({
      ok: false,
      msg: 'No existe el paciente.'
    })
  }

  let vax = req.url.split('/')[2]
  
  if (vax === "COVID19") {
    if (historia.cantidadDosisCovid >= 2) {
      return res.status(400).json({
        ok: false,
        msg: 'El paciente ya tiene el calendario de vacunación de COVID19 completo.'
      })
    } else {
      await HistoriaClinica.findOneAndUpdate(
        {_id: historia._id}, { $inc: {'cantidadDosisCovid': 1}, $set: {'ultimaDosisCovid': new Date()}}
      )
      await Usuario.findOneAndUpdate(
        {_id: paciente._id}, {$push: {vacunasRecibidas: {'vax': "COVID19", 'fecha': new Date()}}}
      )
    }
  }

  if (vax === "GRIPE") {
    console.log(historia.ultimaDosisGripe)
    console.log((new Date() - new Date(historia.ultimaDosisGripe)) / (1000 * 3600 * 24*365) > 1)
    let check = ((new Date() - new Date(historia.ultimaDosisGripe)) / (1000 * 3600 * 24*365) > 1)
    console.log('check', check)
    if (check) {
      await HistoriaClinica.findOneAndUpdate(
          {_id: historia._id}, { $set: {'ultimaDosisGripe': new Date()}}
        )
      await Usuario.findOneAndUpdate(
          {_id: paciente._id}, {$push: {vacunasRecibidas: {'vax': "GRIPE", 'fecha': new Date()}}}
        )
      } else { return res.status(400).json({
        ok: false,
        msg: 'El paciente recibió una dosis contra la gripe hace menos de un año.'
      }) }
    } 

  if (vax === "FIEBREAMARILLA") {
      if (historia.ultimaDosisFiebre) {
        return res.status(400).json({
          ok: false,
          msg: 'El paciente ya recibió vacuna contra la fiebre amarilla.'
        })
      } else {
        await HistoriaClinica.findOneAndUpdate(
        {_id: historia._id}, { $set: {'ultimaDosisFiebre': new Date()}}
      )
      await Usuario.findOneAndUpdate(
        {_id: paciente._id}, {$push: {vacunasRecibidas: {'vax': "FIEBRE AMARILLA", 'fecha': new Date()}}}
      )
    }
  }


  
  res.status(201).json({
    ok: true
  })

}

const getAllPacientes = async (req, res = response) => {

  let pacientes = await Usuario.find()

  let centro = await Centro.find()

  res.status(201).json({
    ok:true,
    pacientes: pacientes,
    centros: centro
  })

}


module.exports = {
  getPerfil,
  usuarioRegistradoPorVac,
  modificarMail,
  modificarCentro,
  modificarPassword,
  getHistoria,
  getUserDNI,
  vacunarPaciente,
  getAllPacientes
}
