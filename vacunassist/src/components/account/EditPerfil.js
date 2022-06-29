import { React, useState, useEffect } from 'react'
import { useDispatch, useSelector, useStore } from 'react-redux'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { Convert } from 'mongo-image-converter'
import { useForm } from '../../hooks/useForm'
import { addExcercise } from '../../actions/excercise'
import { elements } from '../../utils/elements'
import { parts_body } from '../../utils/body'
import { difficulty1 } from '../../utils/difficulty'
import { typeReps } from '../../utils/reps'
import Modal from 'react-modal'
import { modalStyles } from '../../utils/modalStyles'
import Card from '../../utils/card'
import axios from 'axios'
import { $CombinedState } from 'redux'

function EditPerfil() {
  let store = useStore().getState()
  let id = store.auth.uid

  const [centros, setCentros] = useState([])
  let centrosTest = []
  const [input, setInput] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    email: '',
    fechaNacimiento: '',
    pass: '',
    centro: ''
  })

  function handleChange(event) {
    const { name, value } = event.target

    setInput((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      }
    })
  }

  useEffect(() => {
    axios.get('http://localhost:4000/api/user/' + id).then((res) => {
      setInput(res.data)
    }).then(axios.get('http://localhost:4000/api/centros/getallcentros').then((res) => {
      setCentros(res.data)
    }))
  }, [])

  const cambiarEmail = async () => {

    const { value: email } = await Swal.fire({
      title: 'Ingresá un e-mail',
      input: 'text',
      inputLabel: 'Tu e-mail',
      inputPlaceholder: 'Ingresá tu e-mail'
    })

    const correoNuevo = {
      email: email
    }
    
      if (email) {
          axios.post('http://localhost:4000/api/user/modificarmail/' + id,
          correoNuevo).then(function (response) {
            Swal.fire('', 'Se actualizó tu información personal', 'success').then(function() {
              window.location.reload()
          })
          })
        .catch(function (err) {
            Swal.fire('Error', err.response.data.msg, 'error')
        })
      }
  }

  const cambiarCentro = async () => {
    
    let options = []
    console.log('Hola', centros)
    centros.centros.forEach(element => {
      options[element._id] = element.name
    });
    console.log(options)

    const { value: centro } = await Swal.fire({
      title: 'Seleccioná un centro',
      input: 'select',
      inputOptions: options,
      showCancelButton: true,
    })

    const centroNuevo = {
      centro: centro
    }
    
      if (centro) {
          axios.post('http://localhost:4000/api/user/modificarcentro/' + id,
          centroNuevo).then(function (response) {
            Swal.fire('', 'Se actualizó tu información personal', 'success').then(function() {
              window.location.reload()
          })
          })
        .catch(function (err) {
            Swal.fire('Error', err.response.data.msg, 'error')
        })
      }
  }

  const cambiarPassword = async () => {

    const { value: password } = await Swal.fire({
      title: 'Ingresá tu contraseña nueva',
      input: 'password',
      inputLabel: 'Password',
      autocapitalize: 'off',
    })
    const passNueva = {
      password: password
    }
    
       if (password) {
           axios.post('http://localhost:4000/api/user/modificarcontrasena/' + id,
           passNueva).then(function (response) {
             Swal.fire('', 'Se actualizó tu información personal', 'success').then(function() {
               window.location.reload()
           })
           })
         .catch(function (err) {
             Swal.fire('Error', err.response.data.msg, 'error')
         })
       }
  }

  return (
    <div className='flex flex-col  m-2 p-2  mb-4 rounded h-full'>
      <div className='text-white font-bold text-6xl flex-start flex p-4'>
        Modificar perfil{' '}
      </div>
      <hr className='m-4' />
      <div className='w-full'>
        <span className='text-white font-bold text-2xl flex-start flex  p-2 '>
          Centro de preferencia
        </span>
        <input
          type='text'
          name='centro'
          value={input.centro}
          className='form-control text-sm text-white w-full py-5 px-4 h-2 rounded m-2 bg-black bg-opacity-30'
          readOnly='true'></input>
          <button onClick={cambiarCentro} className='text-white w-full rounded h-8 font-bold boton-activo'>
            Cambiar mi centro de preferencia
          </button> 
      </div>
      <hr className='m-4' />
      <div className='form-group'>
        <span className='text-white font-bold text-2xl flex-start flex  p-2'>
          E-mail
        </span>
        <input
          onChange={handleChange}
          type='text'
          name='email'
          placeholder='Dejar vacío si no se desea actualizar'
          value={input.email}
          autoComplete='off'
          className='form-control text-sm text-white w-full py-5 px-4 h-2 rounded m-2 bg-black bg-opacity-30'
          readOnly='true'>
        </input>
        <button onClick={cambiarEmail} className='text-white w-full rounded h-8 font-bold boton-activo'>
          Cambiar mi e-mail
        </button>
      </div>
      <hr className='m-4' />
      <div className='form-group'>
        <span className='text-white font-bold text-2xl flex-start flex  p-2'>
          Contraseña
        </span>
        <button onClick={cambiarPassword} className='text-white w-full rounded h-8 font-bold boton-activo'>Cambiar contraseña</button>  <hr className='m-4' />
      </div>
      <div className='flex'>
        <div className='w-1/2 p-4 pl-0'>
          <div className='w-full p-4 pl-0'>
            <Link to='/home'>
              <button
                type='reset'
                className='text-white w-full rounded h-8 font-bold boton-activo'>
                  Volver
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}


export default EditPerfil
