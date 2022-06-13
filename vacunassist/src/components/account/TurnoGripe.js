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
import { startChecking } from '../../actions/auth'

function TurnoGripe({ turnos2 }) {
  let store = useStore().getState()
  let id = store.auth.uid

  const dispatch = useDispatch()

  //   useEffect(() => {
  //     dispatch(startChecking())
  //   }, [])

  function checkGripe() {
    if (turnos2.find((e) => e.vax === 'GRIPE')) {
        return true
    }
    return false
  }

  async function handleClick(e) {
    e.preventDefault()
    console.log('asd: ' , checkGripe)

    const newTurno = {
      dni: id,
    }

    axios
      .post('http://localhost:4000/api/turno/nuevoturnogripe', newTurno)
      .then((res) => {
        if (res.data.ok) {
          Swal.fire('', `${res.data.msg}`, 'success')
          console.log(res.data.msg)
        } else {
          Swal.fire('', `${res.data.msg}`, 'error')
          console.log(res.data.msg)
        }
        dispatch(startChecking())
      })
      .catch((e) => {
        console.log(e.message)
      })
      .finally(console.log('finally'))
  }

  return (
    <div className=''>
      <button
        disabled={checkGripe() ? true : false}
        onClick={handleClick}
        className={"text-white w-full rounded h-8 text-sm font-bold " + (checkGripe() ? 'opacity-50 boton-inactivo' : 'boton-activo')}
      > 
        Solicitar vacuna contra la gripe
      </button>
    </div>
  )
}

export default TurnoGripe
