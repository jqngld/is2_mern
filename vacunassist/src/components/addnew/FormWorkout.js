import { React, useState } from 'react'
import { useDispatch } from 'react-redux'

import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import { addExcercise } from '../../actions/excercise'

const FormWorkout = ({ isOpen3, toggle2, color }) => {
  const dispatch = useDispatch()

const [error, setError] = useState('')
const [isInvalid, setisInvalid] = useState(false)
const handleNew = async (event) => {
event.preventDefault()
try{

  dispatch(
    addExcercise(
      nameE,
      description,
      difficulty,
      amount_repetitions,
      duration,
      number_breaths,
      muscle_area,
      )
      )
    }catch(e){
console.log(e);
    }
  console.log('new');
}


const [formExcercise, handleFormExcerciseInputChange] = useForm({
  nameE: '',
  description: '',
  difficulty: '',
  amount_repetitions: '',
  duration: '',
  number_breaths: '',
  muscle_area: '',
})

const {
  nameE,
  description,
  difficulty,
  amount_repetitions,
  duration,
  number_breaths,
  muscle_area,
 } = formExcercise

  return (
    <div
      className={
        isOpen3
          ? ` grid text-center items-center poppinsSemiBold nowrap ${color}`
          : 'hidden'
      }
     
    >
     <div className='h-full p-16'>
        <div className='flex flex-col items-center m-4 p-4  mb-4 rounded h-full'>
          {error && <p className='mb-4 text-xs text-red-primary'>{error}</p>}

          <form onSubmit={handleNew} method='POST'>
        
        

            <input
              type='text'
              className='form-control'
              placeholder='Nombre del ejercicio'
              name='nameE'
              className='text-sm text-gray-base w-full py-5 px-4 h-2 border border-gray-primary rounded m-2'
              value={nameE}
              onChange={handleFormExcerciseInputChange}
            />
            <input
              type='text'
              className='form-control'
              placeholder='Descripción del ejercicio'
              name='description'
              className='text-sm text-gray-base w-full py-5 px-4 h-2 border border-gray-primary rounded m-2'
              value={description}
              onChange={handleFormExcerciseInputChange}
            />
              <input
              type='text'
              className='form-control'
              placeholder='Dificultad'
              name='difficulty'
              className='text-sm text-gray-base w-full py-5 px-4 h-2 border border-gray-primary rounded m-2'
              value={difficulty}
              onChange={handleFormExcerciseInputChange}
            />
              <input
              type='number'
              className='form-control'
              placeholder='Cantidad de repeticiones'
              name='amount_repetitions'
              className='text-sm text-gray-base w-full py-5 px-4 h-2 border border-gray-primary rounded m-2'
              value={amount_repetitions}
              onChange={handleFormExcerciseInputChange}
            />
              <input
              type='number'
              className='form-control'
              placeholder='Duración'
              name='duration'
              className='text-sm text-gray-base w-full py-5 px-4 h-2 border border-gray-primary rounded m-2'
              value={duration}
              onChange={handleFormExcerciseInputChange}
            />
              <input
              type='number'
              className='form-control'
              placeholder='Cantidad de respiraciones'
              name='number_breaths'
              className='text-sm text-gray-base w-full py-5 px-4 h-2 border border-gray-primary rounded m-2'
              value={number_breaths}
              onChange={handleFormExcerciseInputChange}
            />
              <input
              type='text'
              className='form-control'
              placeholder='Áreas musculares involucradas'
              name='muscle_area'
              className='text-sm text-gray-base w-full py-5 px-4 h-2 border border-gray-primary rounded m-2'
              value={muscle_area}
              onChange={handleFormExcerciseInputChange}
            />
            <div className='flex'>
              <div className='w-1/2 p-8'>
                  <button
                    className={`text-white w-full rounded h-8 font-bold boton-activo
                  `}
                  >
                    Cancelar
                  </button>
              </div>
              <div className='w-1/2 p-8'>
                <button
                  disabled={isInvalid}
                  type='submit'
                  value='Guardar'
                  className={`text-white w-full rounded h-8 font-bold boton-activo
  ${isInvalid && 'opacity-50 boton-inactivo'}`}
                >
                  Guardar
                </button>
              </div>
            </div>
          </form>
        
        </div>
        </div>

    </div>
  )
}

export default FormWorkout
