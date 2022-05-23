import { React, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
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
  })

  const [error, setError] = useState('')

  const { name, email, rPassword1, rPassword2, lastname, dni, tel, date } =
    formRegisterValues

  const isInvalid2 =
    rPassword1 === '' || email === '' || name === '' || rPassword2 === ''

  const handleRegister = (e) => {
    e.preventDefault()

    if (rPassword1 !== rPassword2) {
      return Swal.fire('Error', 'Las contraseñas deben de ser iguales', 'error')
    }
    dispatch(startRegister(email, rPassword1, name, lastname, dni, tel, date))
    // reset()
  }

  useEffect(() => {
    document.title = 'Regístrate - Workout'
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
  const [startDate, setStartDate] = useState(new Date())

  return (
    <div className='max-h-screen overflow-x-hidden'>
      <div className=' justify-center max-w-screen p-8'>
        <img className='w-2/3 sm:w-1/3 ' src='images/logo.svg' alt='' />
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