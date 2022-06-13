const Usuario = require('../models/Usuario.js')
const bcrypt = require('bcryptjs')

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

const usuarioRegistradoPorVac = async (req, res = response) => {
  
  const { name, lastname, dni, email, date, password, centro } = req.body

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
      // var m = today.getMonth() - birthDate.getMonth()
      // if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      //   age--
      // }
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



const getPerfil = async (req, res = response) => {

  var user = req.url.split('/')[1]
  console.log(user)

  // let info = await Usuario.findById(ObjectId(user)).exec()
  let info2 = await Usuario.findOne({ _id: user })
  console.log(info2.email)
  let fechita = info2.date
  let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  let fechaza = fechita.toLocaleString('es-SP', options)
  // console.log(info)
  res.json({
    email: info2.email,
    name: info2.name,
    lastname: info2.lastname,
    dni: info2.dni,
    tel: info2.tel,
    date: fechaza,
    age: info2.age,
    is_vacunador: info2.is_vacunador,
    centro: info2.centro
  })
}

module.exports = {
  getPerfil,
  usuarioRegistradoPorVac
}
