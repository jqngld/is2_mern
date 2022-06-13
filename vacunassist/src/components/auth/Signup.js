import { React, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import { startRegister } from '../../actions/auth'
import Swal from 'sweetalert2'
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'

export const Signup = () => {
  const dispatch = useDispatch()

  // const [profesorAccount, setprofesorAccount] = useState(undefined)

  const [formRegisterValues, handleRegisterInputChange, reset] = useForm({
    name: '',
    lastname: '',
    tel: 0,
    dni: 0,
    email: '',
    date: undefined,
    rPassword1: '',
    rPassword2: '',
    cant: '',
    fechaCovid: '',
    fechaFiebre: '',
    risk: '',
    fechaGripe: '',
    centro: '',
  })

  const [error, setError] = useState('')

  const { name, email, rPassword1, rPassword2, lastname, dni, tel, date, centro, cant, fechaCovid, fechaFiebre, fechaGripe, risk } =
    formRegisterValues

  const isInvalid2 =
    rPassword1 === '' || email === '' || name === '' || rPassword2 === ''

  const handleRegister = (e) => {
    e.preventDefault()

    if (rPassword1 !== rPassword2) {
      return Swal.fire('Error', 'Las contraseñas deben de ser iguales', 'error')
    }
    if (dni == '42941949') {
      return Swal.fire('Error', 'El DNI no pudo ser validado por el RENAPER', 'error')
    }
    dispatch(startRegister(email, rPassword1, name, lastname, dni, tel, date, centro))
    // reset()
  }
  const [startDate, setStartDate] = useState()

  useEffect(() => {
    document.title = 'VACUNASSIST'
    setStartDate(new Date())
    let ev = {}
    ev.target = {}
    ev.target.name = 'date'
    ev.target.value = startDate
    handleRegisterInputChange(ev)
  }, [])

  // datepicker

  const handleDate = (date) => {
    setStartDate(date)
    let ev = {}
    ev.target = {}
    ev.target.name = 'date'
    ev.target.value = date
    handleRegisterInputChange(ev)
  }

  return (
    <div className='max-h-screen overflow-x-hidden'>
      <div className=' justify-center max-w-screen p-8'>
        <img
          className='w-2/3 sm:w-1/3 '
          src='https://i.ibb.co/FYdLf8n/Sin-t-tulo-1.png'
          alt=''
        />
      </div>

      <div className=' flex max-w-6xl'>
        <div className=' flex flex-wrap p-5 flex-col items-center '>
          <div className='cmax-w-screen-lg h-full'>
            <div className='p-2 text-gray-700   items-center cursor-pointer'>
              <h1 className='px-4 sm:px-8 flex w-full text-3xl semititle font-bold'>
                Completá tus datos
              </h1>
              <span
                className={
                  true
                    ? 'visible text-white px-4 sm:px-8 italic mt-4'
                    : 'invisible'
                }
              >
                Los campos con (*) son obligatorios.
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col items-center m-2 p-2  mb-4 rounded max-w-screen '>
        {error && <p className='mb-4 text-xs text-red-primary'>{error}</p>}
        <form onSubmit={handleRegister}>
          <div className='flex flex-wrap'>
            <div className='w-full sm:w-1/2 p-4 '>
              <span className='text-white font-bold text-xl flex-start flex  pl-2'>
                Nombre *
              </span>
              <input
                className='text-sm text-gray-base w-full  py-5 px-4 h-2 border border-gray-primary rounded m-2'
                type='text'
                placeholder='Ingresá tu nombre...'
                name='name'
                value={name}
                onChange={handleRegisterInputChange}
              />
            </div>
            <div className='w-full sm:w-1/2 p-4 '>
              <span className='text-white font-bold text-xl flex-start flex  pl-2'>
                Apellido *
              </span>
              <input
                className='text-sm text-gray-base w-full m-2 py-5 px-4 h-2 border border-gray-primary rounded'
                type='text'
                placeholder='Ingresá tu apellido...'
                name='lastname'
                value={lastname}
                onChange={handleRegisterInputChange}
              />
            </div>

            <div className='w-full sm:w-1/2 p-4 '>
              <span className='text-white font-bold text-xl flex-start flex  pl-2'>
                DNI *
              </span>
              <input
                className='text-sm text-gray-base w-full m-2 py-5 px-4 h-2 border border-gray-primary rounded '
                type='text'
                placeholder='Ingresá tu DNI...'
                name='dni'
                value={dni}
                onChange={handleRegisterInputChange}
              />
              <span
                className={
                  true ? 'visible text-white italic ml-4' : 'invisible'
                }
              >
                Ingresá sólo números
              </span>
            </div>

            <div className='w-full sm:w-1/2 p-4 '>
              <span className='text-white font-bold text-xl flex-start flex  pl-2'>
                Fecha de Nacimiento *
              </span>
              <div className='p-4'>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => handleDate(date)}
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode='select'
                  dateFormat='dd/MM/yyyy'
                />
              </div>{' '}
              <span
                className={
                  true ? 'visible text-white italic ml-4' : 'invisible'
                }
              >
                Formato "dia/mes/año"
              </span>{' '}
            </div>

            <div className='w-full sm:w-1/2 p-4 '>
              <span className='text-white font-bold text-xl flex-start flex  pl-2'>
                Teléfono *
              </span>
              <input
                className='text-sm text-gray-base w-full m-2 py-5 px-4 h-2 border border-gray-primary rounded'
                type='Ingresá tu número de teléfono'
                placeholder='Ingresá tu teléfono'
                name='tel'
                value={tel}
                onChange={handleRegisterInputChange}
              />
              <span
                className={
                  true ? 'visible text-white italic ml-4' : 'invisible'
                }
              >
                Ingresá sólo números
              </span>
            </div>

            <div className='w-full sm:w-1/2 p-4 '>
              <span className='text-white font-bold text-xl flex-start flex  pl-2'>
                Email *
              </span>
              <input
                className='text-sm text-gray-base w-full m-2 py-5 px-4 h-2 border border-gray-primary rounded'
                type='email'
                placeholder='Ingresá tu email...'
                name='email'
                value={email}
                onChange={handleRegisterInputChange}
              />

              <span
                className={
                  true ? 'visible text-white italic ml-4' : 'invisible'
                }
              >
                Debe contener un @ y terminar en '.com'
              </span>
            </div>

            <div className='w-full sm:w-1/2 p-4 '>
              <span className='text-white font-bold text-xl flex-start flex  pl-2'>
                Contraseña *
              </span>
              <input
                type='password'
                placeholder='Contraseña'
                name='rPassword1'
                value={rPassword1}
                onChange={handleRegisterInputChange}
                className='text-sm text-gray-base w-full m-2 py-5 px-4 h-2 border border-gray-primary rounded '
              />
              <span
                className={
                  true ? 'visible text-white italic ml-4' : 'invisible'
                }
              >
                Mínimo 6 caracteres
              </span>
            </div>
            <div className='w-full sm:w-1/2 p-4 '>
              <span className='text-white font-bold text-xl flex-start flex  pl-2'>
                Repetir Contraseña *
              </span>
              <input
                type='password'
                placeholder='Repita la contraseña'
                name='rPassword2'
                value={rPassword2}
                onChange={handleRegisterInputChange}
                className='text-sm text-gray-base w-full m-2 py-5 px-4 h-2 border border-gray-primary rounded'
              />
              <span
                className={
                  true ? 'visible text-white italic ml-4' : 'invisible'
                }
              >
                Deben coincidir
              </span>
            </div>
            <div className='w-full sm:w-1/2 p-4 '>
              <span className='text-white font-bold text-xl flex-start flex  pl-2'>
                Seleccioná el centro más cercano a la zona de tu domicilio *
              </span>
              <select
                onChange={handleRegisterInputChange}
                value={centro}
                name='centro'
                className='form-select text-sm text-white w-full py-3 rounded m-2 bg-black bg-opacity-30'
              >
                <option value='Centro Cementerio' selected='true'>Centro Zona Cementerio</option>
                <option value='Centro Municipalidad'>Centro Zona Municipalidad</option>
                <option value='Centro Terminal'>Centro Zona Terminal</option>
              </select>
            </div>
            

            {/* historia clinica */}
            {/* <div className={'flex visible w-full'}>
              <div className='w-full sm:w-1/2 p-4 '>
                <span className='text-white font-bold text-xl flex-start flex  pl-2'>
                  Cantidad de días por semana *
                </span>
                <input
                  type='range'
                  min='1'
                  max='7'
                  placeholder='Número de días que podrías entrenar'
                  name='num_of_day'
                  value={num_of_day}
                  onChange={handleRegisterInputChange}
                  className='text-sm text-gray-base w-full m-2 py-5 px-4 h-2 border border-gray-primary rounded'
                />

                <span
                  className={
                    true ? 'visible text-white italic ml-4' : 'invisible'
                  }
                >
                  Cantidad de días: {num_of_day}
                </span>
              </div>
              <div className='w-full sm:w-1/2 p-4 '>
                <span className='text-white font-bold text-xl flex-start flex  pl-2'>
                  Dolencias o padecimientos *
                </span>
                <input
                  type='text'
                  placeholder='Padecimientos'
                  name='illnes'
                  value={illnes}
                  onChange={handleRegisterInputChange}
                  className='text-sm text-gray-base w-full m-2 py-5 px-4 h-2 border border-gray-primary rounded'
                />
              </div>
            </div> */}
          </div>
          {/*<hr className='m-4' />
           <div className='p-2 text-gray-700   items-center cursor-pointer'>
              <h1 className='px-4 sm:px-8 flex w-full text-3xl semititle font-bold'>
                Tu historia clínica
              </h1>
              <span
                className={
                  true
                    ? 'visible text-white px-4 sm:px-8 italic mt-4'
                    : 'invisible'
                }
              >
              
              </span>
            </div>
          <div className='form-group'>
            <span className='text-white font-bold text-2xl flex-start flex  p-2'>
              Cantidad de dosis de vacuna(s) contra el COVID19 que recibiste
            </span>
            <select
              onChange={handleRegisterInputChange}
              value={cant}
              name='cant'
              className='form-select w-full h-10 rounded m-2 bg-black bg-opacity-30'
            >
              <option value='0' selected='true'>
                0
              </option>
              <option value='1'>
                1
              </option>
              <option value='2'>
                2
              </option>
            </select>
          </div>
        
          <div className='form-group'>
            <span className='text-white font-bold text-2xl flex-start flex  p-2'>
              Fecha de tu última dosis recibida contra el COVID19
            </span>
            <input
              // onChange={handleRegisterInputChange}
              onChange={handleRegisterInputChange}
              type='date'
              id='fechaCovid'
              name='fechaCovid'
              value={fechaCovid}
              autoComplete='off'
              className='form-control text-sm text-white w-full py-5 px-4 h-2 rounded m-2 bg-black bg-opacity-30'
              disabled={formRegisterValues.cant == 0 ? true : false}
            ></input>
          </div>
        
          <div className='form-group'>
            <span className='text-white font-bold text-2xl flex-start flex  p-2'>
              Fecha de tu última dosis recibida contra la gripe
            </span>
            <input
              onChange={handleRegisterInputChange}
              type='date'
              name='fechaGripe'
              value={fechaGripe}
              autoComplete='off'
              className='form-control text-sm text-white w-full py-5 px-4 h-2 rounded m-2 bg-black bg-opacity-30'
            ></input>
          </div>
        
          <div className='form-group'>
            <span className='text-white font-bold text-2xl flex-start flex  p-2'>
              Fecha de tu última dosis recibida contra la fiebre amarilla
            </span>
            <input
              onChange={handleRegisterInputChange}
              type='date'
              name='fechaFiebre'
              value={fechaFiebre}
              autoComplete='off'
              className='form-control text-sm text-white w-full py-5 px-4 h-2 rounded m-2 bg-black bg-opacity-30'
            ></input>
          </div>
        
          <div className='form-group'>
            <span className='text-white font-bold text-2xl flex-start flex  p-2'>
              ¿Tiene factores preexistentes que lo convierten en un paciente de
              riesgo?
            </span>
            <select
              onChange={handleRegisterInputChange}
              value={risk}
              name='risk'
              className='form-select w-full h-10 rounded m-2 bg-black bg-opacity-30'
            >
              <option value='true' selected='true'>
                Sí
              </option>
              <option value='false'>No</option>
            </select>
          </div> */}
          <div className='flex'>
            <div className='w-1/2 mr-2'>
              <Link to='/'>
                <button
                  className={`text-white w-full rounded h-8 font-bold boton-activo
                  `}
                >
                  Atrás
                </button>
              </Link>
            </div>
            <div className='w-1/2 ml-2'>
              <button
                disabled={isInvalid2}
                type='submit'
                value='Login'
                className={`text-white w-full rounded h-8 font-bold boton-activo
  ${isInvalid2 && 'opacity-50 boton-inactivo'}`}
              >
                Regístrate
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className='flex justify-center items-center flex-col w-full m-4 p-4 text-white'>
        <p className='text-sm'>
          Tenés una cuenta?
          {` `}
          <Link to='/login'>
            <span
              className='font-bold text-blue-medium'
              // onClick={() => {
              //   setprofesorAccount(false)
              // }}
            >
              Acceder
            </span>
          </Link>
        </p>
      </div>
    </div>
  )
}
