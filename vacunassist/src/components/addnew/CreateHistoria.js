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

function CreateHistoria() {
  let store = useStore().getState()

  const [input, setInput] = useState({
    cant: '',
    fechaCovid: '',
    fechaGripe: '',
    fechaFiebre: '',
    risk: '',
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

    Swal.fire('', 'Se actualizó tu historia clínica', 'success')
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
            <input
              onChange={handleChange}
              type='number'
              placeholder='Ingresá un número'
              name='cant'
              value={input.cant}
              autoComplete='off'
              className='form-control text-sm text-white w-full py-5 px-4 h-2 rounded m-2 bg-black bg-opacity-30'
            ></input>
          </div>
          <hr className='m-4' />
          <div className='form-group'>
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
            ></input>
          </div>
          <hr className='m-4' />
          <div className='form-group'>
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
          <hr className='m-4' />
          <div className='form-group'>
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
            ></input>
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
              className='form-select'
            >
              <option value='true' selected='true'>
                Sí
              </option>
              <option value='false'>No</option>
            </select>
          </div>

          <hr className='m-4' />

          <div className='flex'>
            <div className='w-1/2 p-4 pl-0'>
              <button
                type='reset'
                className='text-white w-full rounded h-8 font-bold boton-activo'
              >
                <Link to='/home'>Cancelar</Link>
              </button>
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
      </div>
    </div>
  )
}

export default CreateHistoria
