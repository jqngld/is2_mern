import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Modal from 'react-modal'

import FormExcercise from './FormExcercise'
// import FormWorkout from './FormWorkout'
import { addExcercise, getAllExcercises } from './../../actions/excercise'
Modal.setAppElement('#root')

export const Addnew = () => {
  const dispatch = useDispatch()

  const dropRef = useRef()
  const [isOpen2, setIsOpen2] = useState(true)
  const [isOpen3, setIsOpen3] = useState(false)

  const [isColor, setColor] = useState('black')
  const [mensaje, setmensaje] = useState('')
  // const [mensaje2, setmensaje2] = useState('')

  const toggle = () => {
    setIsOpen2(!isOpen2)
  }

  const toggle2 = () => {
    setIsOpen3(!isOpen3)
  }

  const formValues = {
    name: 'squat',
    description: 'sentadillas',
    difficulty: 'soft',
    amount_repetitions: 0,
    duration: 0,
    number_breaths: 20,
  }
  const handleSubmitForm = (e) => {
    e.preventDefault()
    dispatch(addExcercise(formValues))
  }

  dispatch(getAllExcercises())

  return (
    <div
      style={{ maxHeight: '100vh', overflow: 'scroll', overflowX: 'hidden' }}
      className='min-h-full w-full sm:ml-4 p-2 md:p-4 lg:p-8 pt-8'
    >
      <div className='mt-8'>
        <Link to='/home' aria-label='Workout logo'>
          <h1 className='flex w-full p-8 justify-center transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 tracking-wider'>
            <img
              style={{ width: ' 250px' }}
              src='https://i.ibb.co/FYdLf8n/Sin-t-tulo-1.png'
              alt=''
              className='mt-2 w-full'
            />
          </h1>
        </Link>

        <hr />
        <hr />

        <div className='flex flex-col '>
          <div className='flex items-center'>
            <button
              // onClick={(handleSubmitForm, toggle)}
              className='font-bold rounded  border-solid text-white align-items center border-2 rounded-md   m-2 p-2  p-0 w-full'
            >
              + Añadir ejercicio
            </button>
            <h4 className=''>{mensaje}</h4>
          </div>
          <hr />
          <FormExcercise
            isOpen={isOpen2}
            color={isColor}
            ref={dropRef}
            toggle={toggle}
          />
        </div>

        {/* <div className='flex flex-col '>
          <div className='flex items-center'>
            <button
              onClick={(handleSubmitForm, toggle2)}
              className='font-bold rounded  border-solid text-white align-items center border-2 rounded-md  transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 m-2 p-2 w-1/2 sm:w-4/12 md:w-3/12 lg:w-2/12 p-0'
            >
              + Añadir bloque
            </button>
            <h4 className=''>{mensaje2}</h4>
          </div>
          <hr />

          <FormWorkout
            isOpen3={isOpen3}
            color={isColor}
            ref={dropRef}
            toggle2={toggle2}
          />
        </div> */}
      </div>
    </div>
  )
}
