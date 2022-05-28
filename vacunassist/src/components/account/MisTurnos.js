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
import VerTurnos from './Turnos'
import TurnoFiebre from './TurnoFiebre'

function MisTurnos() {
  let store = useStore().getState()
  let id = store.auth.uid

  const [turnos, setTurnos] = useState([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    axios.get('http://localhost:4000/api/turno/' + id).then((res) => {
      if (res.data.ok) {
        setTurnos(res.data.turnos)
        setCargando(true)
      } else {
        setCargando(false)
      }
    })
  }, [])

  //   const getTurnos = () => {
  //     axios.get('http://localhost:4000/api/turno/' + id).then((res) => {
  //       console.log(res)
  //     })
  //   }

  return (
    <div className='text-left '>
      {!cargando ? (
        <>
          <h1>Cargando turnos...</h1>
        </>
      ) : (
        <>
          <div className='text-white font-bold text-4xl p-2'>Mis turnos</div>
          <hr className='m' />
          <VerTurnos turnos={turnos} />
          <hr className='m' />

          {!turnos.find((e) => e.vax === 'FIEBRE AMARILLA') && (
            <TurnoFiebre turnos2={turnos} />
          )}
        </>
      )}
    </div>
    //data && Array.isArray(data) && data.length > 0 && data.map((user, i) =>
  )
}

export default MisTurnos
