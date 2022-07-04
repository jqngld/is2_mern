import { React, useState, useEffect } from 'react'
import { useDispatch, useSelector, useStore } from 'react-redux'
import { Link } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import Swal from 'sweetalert2'
import Card from '../../utils/card'
import axios from 'axios'
import VerTurnos from './Turnos'
import TurnoFiebre from './TurnoFiebre'
import TurnoGripe from './TurnoGripe'
import Sidebar22 from '../ui/SidebarVac'
import AusentePresente from './AusentePresente'

export const VerTurnosVac = () => {
    const dispatch = useDispatch()
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

    let store = useStore().getState()
    let id = store.auth.uid
  
    const [perfil, setPerfil] = useState({})
    const [turnos, setTurnos] = useState({})
    const [startDate, setStartDate] = useState(new Date())

    function handleChange(event) {

      console.log('holaaa')

      setStartDate(event)

      axios.get('http://localhost:4000/api/turno/turnosfecha/' + event.toLocaleString('es-AR').split(',')[0].replaceAll('/', '-')+ '/' + id )
      .then((res) => {
        setTurnos(res.data)
      })

    }
  
    useEffect(() => {
      setStartDate(new Date())
      axios.get('http://localhost:4000/api/turno/turnosfecha/' + new Date().toLocaleString('es-AR').split(',')[0].replaceAll('/', '-') + '/' + id )
      .then((res) => {
        setTurnos(res.data)
      })
      axios.get('http://localhost:4000/api/user/' + id).then((res) => {
        console.log(res.data)
        setPerfil(res.data)
      })
    }, [])
  
    return (
      <div className='rowC'> 
        <Sidebar22/>
        <div classname=''>
          <div className='text-white font-bold text-4xl p-5 pb-4'>
            Próximos turnos
          </div>
          <div className='text-white font-bold text-1xl p-5 pb-4'>
            Tu centro: {perfil.centro}
          </div>
          <div className='text-white font-bold text-1xl p-5 pb-4'>
            {/* Fecha: 
            <DatePicker
                  onChange={(date) => handleChange(date)}
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode='select'
                  dateFormat='yyyy/MM/dd'
                /> */}

            Turnos para el día {startDate.toLocaleString('es-AR').split(',')[0].replaceAll('/', '-')}
            {(turnos.listaturnos) ? console.log('t', turnos.listaturnos.length) : console.log('nadita')}
            {turnos.listaturnos !=0 ? (
    <div className='text-white text-left font-bold text-2xl flex-col p-4'>
      {Array.isArray(turnos.listaturnos) &&
        turnos.listaturnos.map((turno, index) => (
          <div key={index}>
            <div className='rowC'>
              Vacuna: {turno.vax}
              <AusentePresente turno={turno}/>
            </div>
            <h1>
              Email del paciente: {turno.paciente}
            </h1>
            <br></br>
          </div>
        ))}
    </div> ) : ( <> <h1 className='text-white text-left font-bold flex-col p-4'> No hay ningún turno programado. </h1> </>)}
          </div>
        </div>
      </div>
    )
  }
  
  export default VerTurnosVac