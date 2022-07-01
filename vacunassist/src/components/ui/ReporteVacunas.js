import { React, useState, useEffect } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import Swal from "sweetalert2";
import { modalStyles } from "../../utils/modalStyles";
import axios from "axios";
import { startRegisterVac } from "../../actions/auth";
import Sidebar33 from "../ui/SidebarAdm";
import DatePicker from "react-datepicker";
import { array } from "prop-types";

function ReporteVacunas() {
  let store = useStore().getState();
  const dispatch = useDispatch();

  const [formRegisterValues, handleRegisterInputChange, reset] = useForm({
    dni: 0,
  });

  let {
    dni
  } = formRegisterValues;

  const [paciente, setPaciente] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [centro, setCentro] = useState([])
  const [centroBusqueda, setCentroBusqueda] = useState();
  const [vacuna, setVacuna] = useState([])
  const [historia, setHistoria] = useState();
  const [botonStyle, setBotonStyle] = useState('text-white w-full text-sm rounded h-8 font-bold boton-inactivo')
  const [initVacunas, setVacunasInicial] = useState([])

  useEffect(() => {
    axios.post('http://localhost:4000/api/turno/getallvacunas')
    .then((res) => {
      setVacuna(res.data.turnos)
      setVacunasInicial(res.data.turnos)
    })
  }, [])

  const fetchPaciente = (e) => {
    e.preventDefault()

    const buscar = {
      dni: formRegisterValues.dni
    };
    
    axios.post("http://localhost:4000/api/user/getpaciente", buscar)
    .then((res) => {
      setPaciente(res.data.pacientes)
      setHistoria(res.data.historia)
      setBotonStyle('text-white w-full text-sm rounded h-8 font-bold boton-activo')
    })
.catch(function (err) {
       setPaciente([])
       setBotonStyle(('text-white w-full text-sm rounded h-8 font-bold boton-inactivo'))
   })

  }

  return (
    <div className="grid text-center poppinsSemiBold nowrap flex-start flex rowC">
      <Sidebar33 />
        <div className="">
          <div className="text-white font-bold text-4xl flex-start px-5 py-2 flex">
            Reporte de vacunas otorgadas
          </div>
          <div className="w-full p-4">
          <span className="text-white font-bold text-xl flex-start flex pl-2 py-3">
              Buscar por vacuna
            </span>
          <select
          onChange={(e) => {
            console.log(e.target.value)
            let arr = []
                for (let i=0; i<initVacunas.length; i++) {
                    if (initVacunas[i].vax === e.target.value) {
                        arr.push(initVacunas[i])
                    }
                }
            setVacuna(arr)
          }}
           className="text-sm p-4 text-white w-full py-3 rounded m-2 bg-black bg-opacity-30">
            <option selected="true" disabled="true">Seleccioná una vacuna</option>
            <option value="COVID19">Covid-19</option>
            <option value="GRIPE">Gripe</option>
            <option value="FIEBRE AMARILLA">Fiebre amarilla</option>
        </select>
        <button className="text-white w-full rounded h-8 font-bold boton-activo">
                Buscar
        </button>
        <span className="text-white font-bold text-xl flex-start flex pl-2 py-3">
              Buscar por fecha
        </span>
        <div className="form-group text-sm text-black p-4 w-full py-3 rounded m-2 bg-black bg-opacity-30">
              <DatePicker
                  maxDate={new Date()}
                  onChange={(date) => {
                    console.log('jiji', date.toISOString().split('T')[0])
                    
                    let arr = []
                     for (let i=0; i<initVacunas.length; i++) {
                         if (initVacunas[i].date.split('T')[0] === date.toISOString().split('T')[0]) {
                             arr.push(initVacunas[i])
                         }
                     }
                    setVacuna(arr)

                  }}
                  dropdownMode="select"
                  dateFormat="dd/MM/yyyy"
              />        
              </div>
        </div>


        <div className="w-full p-4 text-sm">

            {vacuna.length !=0 ? (
    <div className='text-white text-left font-bold text-sm flex-col p-4'>
      {Array.isArray(vacuna) &&
        vacuna.map((vax, index) => (
          <div key={index}>
            <span className="text-white font-bold flex-start flex pl-2 py-3">
              Vacuna: {vax.vax} | Fecha: {vax.dateString} | Paciente: {vax.paciente} | Observación: {vax.observacion}
            </span>
            <hr className='m' />
          </div>
        ))}
    </div> ) : ( <> <h1 className='text-white text-left font-bold flex-col p-4'> No hay ninguna vacuna que coincida con los criterios de búsqueda. </h1> </>)}
            
        </div>
      </div>
    </div>
  );
}

export default ReporteVacunas;
