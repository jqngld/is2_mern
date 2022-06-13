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

function EditPerfil() {
  let store = useStore().getState()
  let id = store.auth.uid

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

  function handleClick(event) {
    event.preventDefault()

    let id = store.auth.uid

    if(input.email != undefined) {
      if (!validateEmail(input.email) && input.email != undefined) {
        return Swal.fire('Error', 'El formato del email no es válido.', 'error')
      }
    }
    
    if(input.pass != undefined) {
    if (input.pass.length != 0 && input.pass.length < 6) {
      return Swal.fire('Error', 'La contraseña debe tener un mínimo de 6 carácteres', 'error')
    }
  }

    const userTemp = {
      dni: id,
      centro: input.centro
    }

    if (input.pass != undefined) {
      userTemp.password = input.pass
    }
    if (input.email != undefined) {
      userTemp.email = input.email
    }

    axios.post(
        'http://localhost:4000/api/auth/editperfil/' + id,
        userTemp
      )

    Swal.fire('', 'Se actualizó tu información personal', 'success')
    .then(function() { window.location.href = `${process.env.REACT_APP_URL}home` })
}

  function validateEmail(email) 
  {
    if(email.length != undefined) {
      var re = /\S+@\S+\.\S+/;
      return re.test(email);
    } else return true
  }

  useEffect(() => {
    axios.get('http://localhost:4000/api/user/' + id).then((res) => {
      console.log(res.data)
      setInput([res.data])
    })
  }, [])

  return (
    <div className='flex flex-col  m-2 p-2  mb-4 rounded h-full'>
        <div className='text-white font-bold text-6xl flex-start flex p-4'>
        Modificar perfil{' '}
      </div>
      <hr className='m-4' />
      <div className='w-full '>
              <span className='text-white font-bold text-2xl flex-start flex  p-2 '>
                Centro de preferencia
              </span>
              <select
                onChange={handleChange}
                value={input.centro}
                name='centro'
                className='form-select text-sm text-white w-full py-3 rounded m-2 bg-black bg-opacity-30'
              >
                <option value='Centro Cementerio' selected='true'>Centro Zona Cementerio</option>
                <option value='Centro Municipalidad'>Centro Zona Municipalidad</option>
                <option value='Centro Terminal'>Centro Zona Terminal</option>
              </select>
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
            ></input>
          </div>
          <hr className='m-4' />
          <div className='form-group'>
            <span className='text-white font-bold text-2xl flex-start flex  p-2'>
              Contraseña
            </span>
            <input
              onChange={handleChange}
              type='password'
              name='pass'
              placeholder='Dejar vacío si no se desea actualizar'
              value={input.pass}
              autoComplete='off'
              className='form-control text-sm text-white w-full py-5 px-4 h-2 rounded m-2 bg-black bg-opacity-30'
            ></input>
          </div>
          <div className='flex'>
            <div className='w-1/2 p-4 pl-0'>
            <Link to='/home'><button
                type='reset'
                className='text-white w-full rounded h-8 font-bold boton-activo'
              >
                Cancelar
              </button></Link>
            </div>
            <div className='w-1/2 p-4 pr-0'>
              <button
                onClick={handleClick}
                className='text-white w-full rounded h-8 font-bold boton-activo'
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
    //data && Array.isArray(data) && data.length > 0 && data.map((user, i) =>
  )
}

export default EditPerfil
