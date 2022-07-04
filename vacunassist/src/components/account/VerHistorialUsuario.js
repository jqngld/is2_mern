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
import TurnoGripe from './TurnoGripe'
import Sidebar from '../ui/Sidebar'

function HistorialVacunas() {
  let store = useStore().getState()
  let id = store.auth.uid

  const [turnosP, setTurnosP] = useState([])
  const [turnosA, setTurnosA] = useState([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    axios.get('http://localhost:4000/api/turno/turnosvacunados/' + id).then((res) => {
      if (res.data.ok) {
        setTurnosP(res.data.turnosPresente)
        setTurnosA(res.data.turnosAusente)
        setCargando(true)
      } else {
        setCargando(false)
      }
    })
  }, [])

  return (
    <div className='text-left rowC  '>
      {!cargando ? (
        <>
          <h1>Cargando turnos...</h1>
        </>
      ) : (
        <>
        <Sidebar/>
        <div className='w-full'>
          <div className='text-white font-bold text-4xl p-2'>Mi historial de vacunación</div>
          <hr className='m'/>
          <h1 className='text-white font-bold text-2xl p-2'>Turnos a los que te presentaste</h1>
          <VerTurnos turnos={turnosP} />
          <hr className='m' />
          <h1 className='text-white font-bold text-2xl p-2'>Turnos a los que no te presentaste</h1>
          <VerTurnos turnos={turnosA} />
          </div>
        </>
      )}
    </div>
    //data && Array.isArray(data) && data.length > 0 && data.map((user, i) =>
  )
}

export default HistorialVacunas
