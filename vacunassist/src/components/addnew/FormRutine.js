import { React, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Convert } from 'mongo-image-converter'

// import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import { addExcercise } from '../../actions/excercise'
import { elements } from '../../utils/elements'
import { parts_body } from '../../utils/body'
import { difficulty1 } from '../../utils/difficulty'
import { typeReps } from '../../utils/reps'

import Modal from 'react-modal'
import { modalStyles } from '../../utils/modalStyles'

// import ReactCardFlip from 'react-card-flip'
import Card from '../../utils/card'
import { Link } from 'react-router-dom'
export const FormRutine = ({ isOpen, toggle, color }) => {
  const [alumno, setAlumno] = useState('unnombre')
  const [dias, setDias] = useState(5)

  const arrayDays = Array.apply(null, Array(dias))
  useEffect(() => {
    let e = {}
    e.target = {}
    e.target.name = 'professor_id'
    e.target.value = uid
    handleFormExcerciseInputChange(e)
    let e2 = {}
    e2.target = {}
    e2.target.name = 'professor_name'
    e2.target.value = name
    handleFormExcerciseInputChange(e2)
    // e.target.name = 'is_professor'
    // e.target.value = is_professor
    // handleFormExcerciseInputChange(e)
  }, [])

  const dispatch = useDispatch()

  const { uid, name, is_professor } = useSelector((state) => state.auth)

  const [imageFile, setImageFile] = useState('')

  const [error, setError] = useState('')
  const [isInvalid, setisInvalid] = useState(false)

  const [errorNombre, seterrorNombre] = useState(false)
  const [visibleNombre, setvisibleNombre] = useState(true)

  let subtitle
  const [modalIsOpen, setIsOpen] = useState(false)

  function openModal() {
    setIsOpen(true)
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#00000'
  }

  function closeModal() {
    setIsOpen(false)
  }

  const [modalIsOpen2, setIsOpen2] = useState(false)

  function openModal2() {
    setIsOpen2(true)
  }

  function afterOpenModal2() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#00000'
  }

  function closeModal2() {
    setIsOpen2(false)
  }

  const [formExcercise, handleFormExcerciseInputChange, reset] = useForm({
    nameE: '',
    description: '',
    difficulty: '',
    type_reps: '',
    muscle_area: [],
    element: [],
    professor_id: '',
    professor_name: '',
    img: '',
    link: '',
  })

  const {
    nameE,
    description,
    difficulty,
    type_reps,
    muscle_area,
    element,
    cover,
    media,
    professor_id,
    professor_name,
    img,
    link,
  } = formExcercise

  const handleNew = async (event) => {
    event.preventDefault()

    try {
      dispatch(addExcercise(formExcercise))
    } catch (e) {
      console.log(e)
    }
    console.log('new')
    // reset()
  }

  const [checkedState, setCheckedState] = useState(
    new Array(elements.length).fill(false)
  )

  const [checkedState2, setCheckedState2] = useState(
    new Array(parts_body.length).fill(false)
  )

  const [checkedState3, setCheckedState3] = useState(
    new Array(difficulty1.length).fill(false)
  )

  const [checkedState4, setCheckedState4] = useState(
    new Array(typeReps.length).fill(false)
  )

  const check = (e) => {
    let target = e.target.id
    const updatedCheckedState = checkedState.map((item, index) =>
      index == target ? !item : item
    )
    checkedState.map((item, index) => console.log(item, index))
    e.target.name = 'element'
    e.target.value = updatedCheckedState
    handleFormExcerciseInputChange(e)
    setCheckedState(updatedCheckedState)
  }

  const check2 = (e) => {
    let target = e.target.id
    console.log(e.target.id)
    const updatedCheckedState2 = checkedState2.map((item, index) =>
      index == target ? !item : item
    )
    checkedState2.map((item, index) => console.log(item, index))
    e.target.name = 'muscle_area'
    e.target.value = updatedCheckedState2
    handleFormExcerciseInputChange(e)
    setCheckedState2(updatedCheckedState2)
  }

  const checkbox = (e) => {
    let target = parseInt(e.target.id.match(/\d/g).join(''), 10)
    e.target.name = 'difficulty'
    e.target.value = difficulty1[target].name
    let updatedCheckedState3 = checkedState3.map((item, index) =>
      index == target ? !item : (item = false)
    )
    setCheckedState3(updatedCheckedState3)
    handleFormExcerciseInputChange(e)
  }

  const checkbox2 = (e) => {
    let e2 = e
    let target = e2.target.id
    e2.target.name = 'type_reps'
    e2.target.value = typeReps[target].name
    let updatedCheckedState11 = checkedState4.map((item, index) =>
      index == target ? !item : (item = false)
    )
    handleFormExcerciseInputChange(e2)
    setCheckedState4(updatedCheckedState11)
  }

  const convertImage = async (f) => {
    try {
      const convertedImage = await Convert(f)
      if (convertedImage) {
        let e = {}
        e.target = {}
        e.target.name = 'img'
        e.target.value = convertedImage
        handleFormExcerciseInputChange(e)
        setImageFile(convertedImage)
        return convertedImage
        // after this pass it to the backend using your fav API,
      } else {
        return 'error'
      }
    } catch (error) {
      return 'error'
    }
  }

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
              src='../images/Logo.svg'
              alt='Rujan'
              className='mt-2 w-full'
            />
          </h1>
        </Link>

        <hr />
        <hr />
        {/* title */}
        <div className='flex items-center'>
          <div
            // onClick={(handleSubmitForm, toggle)}
            className='font-bold rounded   text-white align-items  m-2 p-2  p-0 w-full'
          >
            Crear un entrenamiento personalizado
          </div>
        </div>

        <hr />
        {/* asignar alumno */}
        <div className='flex items-center'>
          <div
            // onClick={(handleSubmitForm, toggle)}
            className='font-bold rounded   text-white align-items  m-2 p-2  p-0 w-full'
          >
            Alumno: {alumno}
          </div>
        </div>

        {alumno !== undefined && (
          <>
            <div className='flex items-center'>
              <div
                // onClick={(handleSubmitForm, toggle)}
                className='font-bold rounded   text-white align-items  m-2 p-2  p-0 w-full'
              >
                Cantidad de días por semana: {dias}
              </div>
            </div>
            <hr />
            <div className='w-full overflow-auto'>
              <div>
                <div className='h-full'>
                  <div className='flex flex-col  m-2 p-2  mb-4 rounded h-full'>
                    {error && (
                      <p className='mb-4 text-xs text-red-primary'>{error}</p>
                    )}

                    <form onSubmit={handleNew} method='POST'>
                      <span className='text-white font-bold text-2xl flex-start flex  p-2'>
                        Nombre *
                      </span>
                      <input
                        type='text'
                        className='form-control'
                        placeholder='Ingrese el nombre de la rutina...'
                        name='nameE'
                        className='text-sm text-white w-full py-5 px-4 h-2 rounded m-2 bg-black bg-opacity-30'
                        value={nameE}
                        onChange={handleFormExcerciseInputChange}
                      />

                      {errorNombre ? (
                        <label
                          htmlFor='nameE'
                          className={`${
                            visibleNombre ? 'mostrar' : 'invisible'
                          } flex flex-start pl-2 text-red-800 italic text-left text-sm`}
                        >
                          Ya existe un ejercicio con el mismo nombre para tu
                          cuenta de profesor.
                        </label>
                      ) : (
                        <label
                          htmlFor='nameE'
                          className={`${
                            errorNombre
                              ? 'red'
                              : visibleNombre
                              ? 'mostrar'
                              : 'invisible'
                          } flex flex-start pl-2 text-gray-300 italic`}
                        >
                          Asignale un nombre a la rutina
                        </label>
                      )}

                      <hr className='m-4' />

                      {arrayDays.map((element, index) => {
                        return (
                          <div>
                            <div className='flex items-center'>
                              <div
                                // onClick={(handleSubmitForm, toggle)}
                                className='font-bold rounded   text-white align-items  m-2 p-2  p-0 w-full'
                              >
                                <h1>Dia {index + 1}</h1>
                              </div>
                            </div>
                            <hr />
                          </div>
                        )
                      })}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
