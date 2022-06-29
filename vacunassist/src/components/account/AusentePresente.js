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

function AusentePresente( turno ) {
  let store = useStore().getState()
  let id = store.auth.uid

  const dispatch = useDispatch()

  let fecha = new Date(turno.turno.date)

  function checkFecha() {
    if (fecha.getTime() > (new Date().getTime() + 86400000)) {
        return true
    }
    return false
  }

  const handleClickPresente = async () => {
    const { value: observacion } = await Swal.fire({
      title: 'Ingresá una observación',
      input: 'text',
      inputLabel: 'Observación',
      showCancelButton: true,
    })

    const estadoNuevo = {
      estado: "Presente",
      obs: observacion
    }
    
    if(observacion) {

      axios.post(
        "http://localhost:4000/api/turno/modificarestado/" + turno.turno._id, estadoNuevo
    ).then(function (response) {
        console.log(response)
        Swal.fire('Éxito', 'Modificaste el estado del turno con éxito', 'success')
            .then(function() {
                window.location.reload()
          })
      })
    .catch(function (err) {
        Swal.fire('Error', 'Hubo un error', 'error')
    })


    }
  }

  const handleClickAusente = async () => {
    const { value: observacion } = await Swal.fire({
      title: 'Ingresá una observación',
      input: 'text',
      inputLabel: 'Observación',
      showCancelButton: true,
    })

    const estadoNuevo = {
      estado: "Ausente",
      obs: observacion
    }

    if(observacion) {

      axios.post(
        "http://localhost:4000/api/turno/modificarestado/" + turno.turno._id, estadoNuevo
    ).then(function (response) {
        console.log(response)
        Swal.fire('Éxito', 'Modificaste el estado del turno con éxito', 'success')
            .then(function() {
                window.location.reload()
          })
      })
    .catch(function (err) {
        Swal.fire('Error', 'Hubo un error', 'error')
    })


    }
  }


  return (
    <div className=''>
      <button
        style={{ width: 100 }}
        onClick={handleClickPresente}
        disabled={checkFecha() ? "true" : ""}
        className={'text-white rounded text-sm font-bold '
        + (checkFecha() ? 'boton-inactivo' : 'boton-activo')}
      >
        Presente
      </button>
      <button
        style={{ width: 100 }}
        onClick={handleClickAusente}
        disabled={checkFecha() ? "true" : ""}
        className={'text-white rounded text-sm font-bold '
        + (checkFecha() ? 'boton-inactivo' : 'boton-activo')}
      >
        Ausente
      </button>
    </div>
  )
}

export default AusentePresente
