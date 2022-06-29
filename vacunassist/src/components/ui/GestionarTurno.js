import { React, useState, useEffect } from 'react'
import { useDispatch, useSelector, useStore } from 'react-redux'
import { Link } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import Swal from 'sweetalert2'
import Card from '../../utils/card'
import axios from 'axios'
import Sidebar33 from './SidebarAdm'

export const ReporteVacunas = () => {
    const dispatch = useDispatch()
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

    let store = useStore().getState()
    let id = store.auth.uid
  
    const [perfil, setPerfil] = useState({})
    const [turnos, setTurnos] = useState({})
    const [startDate, setStartDate] = useState(new Date())

    function handleChange(event) {
      console.log('hola')
      setStartDate(event)
      console.log(startDate)
    }
  
    useEffect(() => {
      setStartDate(new Date())
      axios.post('http://localhost:4000/api/turno/turnospendientes/')
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
            <Sidebar33/>
            <div classname=''>
                <div className='text-white font-bold text-4xl p-5 pb-4'>
                    Próximos turnos
                </div>
                {console.log(turnos)}
                <div className='text-white text-left font-bold text-2xl flex-col p-4'>
                Turnos pendientes {turnos.turno !=0 ? (
    <div className='text-white text-left font-bold text-2xl flex-col p-4'>
      {Array.isArray(turnos.turno) &&
        turnos.turno.map((turno, index) => (
          <div key={index}>
            <div className='rowC'>
              Vacuna: {turno.vax}
            </div>
            <h1>
              Email del paciente: {turno.paciente} <br></br>
              <button onClick={() => {
                Swal.fire({
                    title: "Ingresá la fecha para el turno",
                    html:'<input id="datetimepicker" type="date" class="form-control">',
                    placeholder: "DD/MM/AAAA",
                    onOpen: function() {
                      <DatePicker
                      onChange={(date) => handleChange(date)}
                      peekNextMonth
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode='select'
                      dateFormat='yyyy/MM/dd'
                    />
                    }
                })
              }} className="boton-activo rounded text-sm w-full">Asignar fecha</button>
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
  
  export default ReporteVacunas