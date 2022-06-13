import { React, useState, useEffect } from 'react'
import { useDispatch, useSelector, useStore } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
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
import Sidebar from '../ui/Sidebar'

function CreateHistoria() {
  let store = useStore().getState()

  const [input, setInput] = useState({
    cant: '',
    fechaCovid: '',
    fechaGripe: '',
    fechaFiebre: '',
    risk: '',
    checkGripe: '',
    checkFiebre: ''
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

    console.log('EL ID ES :: ', id)
    console.log('LA CANT ES :: ', input.cant)
    console.log('RIESGO ?? : ', input.risk)

    if (input.cant == 0) {
      input.fechaCovid = ''
    }
    if (!input.checkFiebre) {
      input.fechaFiebre = ''
    }
    if (!input.checkGripe) {
      input.fechaGripe = ''
    }

    const newHistoria = {
      dni: id,
      ultDosisCovid: input.fechaCovid,
      cDosisCovid: input.cant,
      ultDosisFiebre: input.fechaFiebre,
      ultDosisGripe: input.fechaGripe,
      riesgo: input.risk,
    }

    axios.post(
      'http://localhost:4000/api/historiaclinica/nuevahistoriaclinica',
      newHistoria
    )

    Swal.fire('', 'Información registrada', 'success').then(function() { window.location.href = `${process.env.REACT_APP_URL}home` })
  }

  return (
    <div className='grid text-center  poppinsSemiBold nowrap'>
      <div className='text-white font-bold text-6xl flex-start flex p-4'>
        Mi historia clínica{' '}
      </div>
      <div className='h-full'>
        <div className='flex flex-col  m-2 p-2  mb-4 rounded h-full'>
          <div className='form-group'>
            <span className='text-white font-bold text-2xl flex-start flex  p-2'>
              Cantidad de dosis de vacuna(s) contra el COVID19 que recibiste
            </span>
            <select
              onChange={handleChange}
              value={input.cant}
              name='cant'
              className='form-select text-sm text-white w-full py-3 rounded m-2 bg-black bg-opacity-30'
            >
              <option value='0' selected='true'>0</option>
              <option value='1'>1</option>
              <option value='2'>2</option>
            </select>
          </div>
          <div className='form-group' style={{visibility: input.cant != 0 ? 'visible' : 'hidden' }}>
            <hr className='m-4' />
            <div>
              <span className='text-white font-bold text-2xl flex-start flex  p-2'>
                Fecha de tu última dosis recibida contra el COVID19
              </span>
              <input
                onChange={handleChange}
                type='date'
                name='fechaCovid'
                value={input.fechaCovid}
                autoComplete='off'
                className='form-control text-sm text-white w-full py-5 px-4 h-2 rounded m-2 bg-black bg-opacity-30'
                disabled={input.cant == 0 ? true : false}
              ></input>
            </div>
          </div>
          <hr className='m-4' />
          <div className='form-group'>
          <span className='text-white font-bold text-2xl flex-start flex  p-2'>
              Indicá si recibiste la vacuna contra la gripe
            </span> <select
              onChange={handleChange}
              value={input.checkGripe}
              name='checkGripe'
              className='form-select text-sm text-white w-full py-3 rounded m-2 bg-black bg-opacity-30'
            > <option value='false' selected='true'>No recibida</option>
              <option value='true'>
                Recibida
              </option>
              
            </select>
            <div style={{visibility: input.checkGripe == 'true' ? 'visible' : 'hidden' }}>
            <span className='text-white font-bold text-2xl flex-start flex  p-2'>
              Fecha de tu última dosis recibida contra la gripe
            </span>
            <input
              onChange={handleChange}
              type='date'
              name='fechaGripe'
              value={input.fechaGripe}
              autoComplete='off'
              className='form-control text-sm text-white w-full py-5 px-4 h-2 rounded m-2 bg-black bg-opacity-30'
            ></input>
          </div>
          </div>
          <hr className='m-4' />
          <div className='form-group'>
          <span className='text-white font-bold text-2xl flex-start flex  p-2'>
              Indicá si recibiste la vacuna contra la fiebre amarilla
            </span> <select
              onChange={handleChange}
              value={input.checkFiebre}
              name='checkFiebre'
              className='form-select text-sm text-white w-full py-3 rounded m-2 bg-black bg-opacity-30'
            > <option value='false' selected='true'>No recibida</option>
              <option value='true'>
                Recibida
              </option>
              
            </select>
            <div style={{visibility: input.checkFiebre == 'true' ? 'visible' : 'hidden' }}>
            <span className='text-white font-bold text-2xl flex-start flex  p-2'>
              Fecha de tu última dosis recibida contra la fiebre amarilla
            </span>
            <input
              onChange={handleChange}
              type='date'
              name='fechaFiebre'
              value={input.fechaFiebre}
              autoComplete='off'
              className='form-control text-sm text-white w-full py-5 px-4 h-2 rounded m-2 bg-black bg-opacity-30'
            ></input></div>
          </div>
          <hr className='m-4' />
          <div className='form-group'>
            <span className='text-white font-bold text-2xl flex-start flex  p-2'>
              ¿Tiene factores preexistentes que lo convierten en un paciente de
              riesgo?
            </span>
            <select
              onChange={handleChange}
              value={input.risk}
              name='risk'
              className='form-select form-select text-sm text-white w-full py-3 rounded m-2 bg-black bg-opacity-30'
            >
              <option value='true' selected='true'>
                Sí
              </option>
              <option value='false'>No</option>
            </select>
          </div>

          <hr className='m-4' />

          <div className='flex'>
             {/*<div className='w-1/2 p-4 pl-0'>
              <button
                type='reset'
                className='text-white w-full rounded h-8 font-bold boton-activo'
              >
                <Link to='/home'>Cancelar</Link>
              </button> 
            </div>*/}
            <div className='w-1/2 p-4 pr-0'><Link to='/home'>
              <button
                onClick={handleClick}
                className='text-white w-full rounded h-8 font-bold boton-activo'
              >
                 Guardar
              </button></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateHistoria
