
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
import Sidebar from '../ui/Sidebar'

function VerHistClinica() {
  let store = useStore().getState()
  let id = store.auth.uid

  const [perfil, setPerfil] = useState([])

  useEffect(() => {
    axios.get('http://localhost:4000/api/user/historia/' + id).then((res) => {
      console.log(res.data)
      setPerfil(res.data)
    })
  }, [])

  function checkContenido(contenido) {
    if (!contenido) {
      return "No hay información."
    } else return contenido
  }

  function checkRiesgo(riesgo) {
    if (riesgo) {
      return "Sí"
    } return "No"
  }

  return (
    <div className='rowC'>
      <Sidebar/>
      <div classname=''>
      <div className='text-white font-bold text-4xl pb-4'>
        Mi historia clínica
      </div>
          <div className='text-white font-bold text-1xl p-2'>
            <h1>Cantidad de dosis de COVID19: {perfil.cantCovid}</h1> <hr className='m-4' />
            <h1>Fecha de última dosis de COVID19 recibida: {checkContenido(perfil.ultCovid)}</h1> <hr className='m-4' />
            <h1>Fecha de última dosis de gripe recibida: {checkContenido(perfil.ultGripe)}</h1> <hr className='m-4' />
            <h1>Fecha de última dosis de fiebre amarilla recibida: {checkContenido(perfil.ultFiebre)}</h1> <hr className='m-4' />
            <h1>Paciente de riesgo: {checkRiesgo(perfil.riesgo)}</h1>
          </div>
        </div>  
    </div>
    //data && Array.isArray(data) && data.length > 0 && data.map((user, i) =>
  )
}

export default VerHistClinica