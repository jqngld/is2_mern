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

// Modal.setAppElement('#root')

const FormExcercise = ({ isOpen, toggle, color }) => {
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
      className={
        isOpen ? ` grid text-center  poppinsSemiBold nowrap ${color}` : 'hidden'
      }
    >
      <div className='h-full'>
        <div className='flex flex-col  m-2 p-2  mb-4 rounded h-full'>
          {error && <p className='mb-4 text-xs text-red-primary'>{error}</p>}

          <form onSubmit={handleNew} method='POST'>
            <span className='text-white font-bold text-2xl flex-start flex  p-2'>
              Nombre *
            </span>
            <input
              type='text'
              placeholder='Ingrese el nombre del ejercicio...'
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
                Ya existe un ejercicio con el mismo nombre para tu cuenta de
                profesor.
              </label>
            ) : (
              <label
                htmlFor='nameE'
                className={`${
                  errorNombre ? 'red' : visibleNombre ? 'mostrar' : 'invisible'
                } flex flex-start pl-2 text-gray-300 italic`}
              >
                Qué nombre le pondrías a este ejercicio?
              </label>
            )}

            <hr className='m-4' />

            <span className='text-white font-bold text-2xl flex-start flex  p-2'>
              Descripción *
            </span>
            <textarea
              name='description'
              className='text-sm text-white w-full py-5 px-4 h-2 rounded m-2 bg-black bg-opacity-30 h-40'
              id=''
              cols='10'
              rows='10'
              value={description}
              onChange={handleFormExcerciseInputChange}
            >
              {/* <input
                type='text'
                
                placeholder='Descripción del ejercicio'
                name='description'
                className='text-sm text-white w-full py-5 px-4 h-2 rounded m-2 bg-black bg-opacity-30'
                value={description}
                onChange={handleFormExcerciseInputChange}
              /> */}
            </textarea>
            {errorNombre ? (
              <label
                htmlFor='description'
                className={`${
                  visibleNombre ? 'mostrar' : 'invisible'
                } flex flex-start pl-2 text-red-800 italic text-left text-sm`}
              >
                La descripción no puede quedar vacía
              </label>
            ) : (
              <label
                htmlFor='description'
                className={`${
                  errorNombre ? 'red' : visibleNombre ? 'mostrar' : 'invisible'
                } flex flex-start pl-2 text-gray-300 italic`}
              >
                Danos una breve descripción de lo que se trata este ejercicio
              </label>
            )}

            <hr className='m-4' />

            <span className='text-white font-bold text-2xl flex-start flex  p-2'>
              Dificultad *
            </span>
            <div className='flex justify-between'>
              {difficulty1.map(({ name, img }, index2) => {
                return (
                  <li key={index2} id={index2} className='flex justify-between'>
                    <input
                      type='checkbox'
                      placeholder='Dificultad'
                      name='difficulty'
                      className='flex flex-start p-8 m-2'
                      value={name}
                      id={index2 + 'dif'}
                      onClick={checkbox}
                      checked={checkedState3[index2]}
                    />

                    <label
                      onClick={checkbox}
                      id={`${index2}dif`}
                      name='difficulty'
                      className={`flex flex-start pl-2 italic text-left text-sm`}
                    >
                      {name}

                      <img src={img} alt='' />
                    </label>
                  </li>
                )
              })}
            </div>

            <hr className='m-4' />

            {/* REPS */}

            <span className='text-white font-bold text-2xl flex-start flex  p-2'>
              Repeticiones *
            </span>
            <div className='flex flex-wrap justify-between'>
              {typeReps.map(({ name, descrip, img }, index) => {
                return (
                  <li key={index} className='flex justify-between'>
                    <input
                      type='checkbox'
                      placeholder='Dificultad'
                      name='type_reps'
                      className='flex flex-start p-8 m-2 '
                      value={name}
                      id={index}
                      onClick={checkbox2}
                      checked={checkedState4[index]}
                    />

                    <label
                      onClick={checkbox2}
                      id={index}
                      name='type_reps'
                      className={`flex flex-start pl-2 italic text-left text-sm`}
                    >
                      {name}

                      <img src={img} alt='' />
                    </label>
                  </li>
                )
              })}
              {/* 
              <div className='w-1/2'>
                <input
                  type='number'
                  
                  placeholder='Cantidad'
                  name='duration_reps'
                  className='flex flex-start ml-8 h-8 text-sm text-white py-5 px-4 h-2 rounded m-2 bg-black bg-opacity-30'
                  value={duration_reps}
                  onChange={handleFormExcerciseInputChange}
                />

                <div className='flex flex-col'>
                  <label
                    htmlFor='Cantidad'
                    className={`flex flex-start pl-2 italic text-left text-sm`}
                  >
                    Duración
                  </label>
                  <label
                    htmlFor='Cantidad'
                    className={`flex flex-start pl-2 italic text-left text-sm`}
                  >
                    Ingrese sólo valores numéricos (en segundos para tiempo)
                  </label>
                </div>
              </div> */}
            </div>

            {/* Fin REPS */}

            <hr className='m-4' />

            {/* add elements */}

            <span className='text-white font-bold text-2xl flex-start flex  p-2'>
              Herramientas
            </span>

            <div className='flex flex-start p-4  w-full'>
              <div className='flex flex-col'>
                <button
                  type='button'
                  onClick={openModal}
                  class='bg-gray-800 text-white hover:bg-gray-400 font-bold py-2 px-4 rounded inline-flex items-center  w-60 flex justify-around'
                >
                  <span>+</span>
                  <span>Añadir elemento</span>
                </button>
                <div className='flex flex-wrap'>
                  {checkedState.map((item, index) =>
                    item ? (
                      <div id={index}>
                        <button
                          type='button'
                          onClick={check}
                          id={index}
                          class='bg-gray-600 text-white hover:bg-gray-400 font-bold py-2 px-4 rounded inline-flex items-center flex flex-wrap justify-around mt-2 mr-2'
                        >
                          <span className='pr-2' id={index}>
                            -
                          </span>
                          <span id={index}>{elements[index].name}</span>
                        </button>
                      </div>
                    ) : (
                      <div></div>
                    )
                  )}
                </div>
              </div>
              <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={modalStyles}
                contentLabel='Videos Modal'
              >
                <div className='flex justify-between '>
                  <h2
                    ref={(_subtitle) => (subtitle = _subtitle)}
                    className='ml-8 text-2xl text-white'
                  >
                    Seleccione herramientas a utilizar
                  </h2>
                  <button
                    onClick={closeModal}
                    className='border-solid px-3 py-1 border-2 text-white   right-0 '
                  >
                    {' '}
                    X{' '}
                  </button>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                  {elements.map(({ name, descrip, img }, index) => {
                    return (
                      <div
                        id={index}
                        // onMouseEnter={handleClick}
                        // onClick={check}
                        className=' p-8 -20 '
                        key={index}
                      >
                        <Card
                          id={index}
                          img={`images/elements/${index}.png`}
                          nombre={name}
                          rol={descrip}
                          isChecked={checkedState[index]}
                          check={check}
                        ></Card>
                      </div>
                    )
                  })}
                </div>
              </Modal>
            </div>

            {/* add parts_body */}

            <hr className='m-4' />

            <span className='text-white font-bold text-2xl flex-start flex  p-2'>
              Zonas musculares
            </span>

            <div className='flex flex-start p-4  w-full'>
              <div className='flex flex-col'>
                <button
                  type='button'
                  onClick={openModal2}
                  class='bg-gray-800 text-white hover:bg-gray-400 font-bold py-2 px-4 rounded inline-flex items-center  w-60 flex justify-around'
                >
                  <span>+</span>
                  <span>Añadir zona muscular</span>
                </button>
                <div className='flex flex-wrap'>
                  {checkedState2.map((item, index) =>
                    item ? (
                      <div id={index}>
                        <button
                          type='button'
                          onClick={check2}
                          id={index}
                          class='bg-gray-600 text-white hover:bg-gray-400 font-bold py-2 px-4 rounded inline-flex items-center flex flex-wrap justify-around mt-2 mr-2'
                        >
                          <span className='pr-2' id={index}>
                            -
                          </span>
                          <span id={index}>{parts_body[index].name}</span>
                        </button>
                      </div>
                    ) : (
                      <div></div>
                    )
                  )}
                </div>
              </div>
              <Modal
                isOpen={modalIsOpen2}
                onAfterOpen={afterOpenModal2}
                onRequestClose={closeModal2}
                style={modalStyles}
                contentLabel='Videos Modal'
              >
                <div className='flex justify-between '>
                  <h2
                    ref={(_subtitle) => (subtitle = _subtitle)}
                    className='ml-8 text-2xl text-white'
                  >
                    Seleccione zonas musculares involucradas
                  </h2>
                  <button
                    onClick={closeModal2}
                    className='border-solid px-3 py-1 border-2 text-white   right-0 '
                  >
                    {' '}
                    X{' '}
                  </button>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                  {parts_body.map(({ name, descrip, img }, index) => {
                    return (
                      <div
                        id={index}
                        // onMouseEnter={handleClick}
                        // onClick={check}
                        className=' p-8 -20 '
                        key={index}
                      >
                        <Card
                          id={index}
                          img={`images/body/${index}.png`}
                          nombre={name}
                          rol={descrip}
                          isChecked={checkedState2[index]}
                          check={check2}
                        ></Card>
                      </div>
                    )
                  })}
                </div>
              </Modal>
            </div>

            <hr className='m-4' />

            <span className='text-white font-bold text-2xl flex-start flex  p-2'>
              Subir una imagen descriptiva del ejercicio
            </span>

            <input
              type='file'
              onChange={(e) => convertImage(e.target.files[0])}
              alt='agrega un archivo'
            />
            <img src={imageFile} alt='' />

            <hr className='m-4' />

            <span className='text-white font-bold text-2xl flex-start flex  p-2'>
              Agrega el link de un video de referencia
            </span>

            <input
              type='text'
              placeholder='Ingrese el link del video del ejercicio...'
              name='link'
              className='text-sm text-white w-full py-5 px-4 h-2 rounded m-2 bg-black bg-opacity-30'
              value={link}
              onChange={handleFormExcerciseInputChange}
            />

            <hr className='m-4' />

            <div className='flex'>
              <div className='w-1/2 p-4 pl-0'>
                <button
                  type='reset'
                  className={`text-white w-full rounded h-8 font-bold boton-activo boton-danger
                  `}
                >
                  Cancelar
                </button>
              </div>
              <div className='w-1/2 p-4 pr-0'>
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

      <hr />
      <hr />
    </div>
  )
}

export default FormExcercise
