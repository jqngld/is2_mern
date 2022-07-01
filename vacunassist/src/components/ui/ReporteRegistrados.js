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

function ReporteRegistrados() {
  let store = useStore().getState();
  const dispatch = useDispatch();

  const [formRegisterValues, handleRegisterInputChange, reset] = useForm({
    dni: 0,
  });

  let {
    dni
  } = formRegisterValues;

  const [paciente, setPaciente] = useState([]);
  const [centro, setCentro] = useState([])
  const [centroBusqueda, setCentroBusqueda] = useState();
  const [historia, setHistoria] = useState();
  const [botonStyle, setBotonStyle] = useState('text-white w-full text-sm rounded h-8 font-bold boton-inactivo')
  const [initPacientes, setPacientesInicial] = useState([])

  useEffect(() => {
    axios.post('http://localhost:4000/api/user/getallpacientes')
    .then((res) => {
      setPaciente(res.data.pacientes)
      setPacientesInicial(res.data.pacientes)
      setCentro(res.data.centros)
    })
  }, [])

  function parseCentro(string) {
    if (string === "62b543062f480d487924f74a"){
        return centro[0].name
    } else {
        if (string === "62b543062f480d487924f74b"){
            return centro[1].name
        } else {
            if (string === "62b543062f480d487924f74c"){
                return centro[2].name
            } 
        }
    } 
  }

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
            Reporte de pacientes registrados en el sistema
          </div>
          <div className="w-full p-4">
            <span className="text-white font-bold text-xl flex-start flex pl-2 py-3">
              Buscar por DNI
            </span>
            <input
            className="text-sm p-4 text-white w-full py-3 rounded m-2 bg-black bg-opacity-30"
            type="text"
            placeholder="Ingresá el DNI del paciente..."
            name="dni"
            value={dni}
            onChange={handleRegisterInputChange}
            />
          <div className="">
              <button onClick={fetchPaciente} className="text-white w-full rounded h-8 font-bold boton-activo">
                Buscar
              </button>
          </div>
          <span className="text-white font-bold text-xl flex-start flex pl-2 py-3">
              Buscar por centro
            </span>
          <select
            onChange={(e) => {
                console.log(e.target.value)
                let arr = []
                for (let i=0; i<initPacientes.length; i++) {
                    if (initPacientes[i].centro === e.target.value) {
                        arr.push(initPacientes[i])
                    }
                }
                setPaciente(arr)
            }}
            value={centroBusqueda}
            name="centro"
            className="text-sm p-4 text-white w-full py-3 rounded m-2 bg-black bg-opacity-30">
              {Array.isArray(centro) && centro.map(option => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}</select>
        <button className="text-white w-full rounded h-8 font-bold boton-activo">
                Buscar
        </button>
        </div>
        <div className="w-full p-4 text-sm">

            {paciente.length !=0 ? (
    <div className='text-white text-left font-bold text-sm flex-col p-4'>
      {Array.isArray(paciente) &&
        paciente.map((paciente, index) => (
          <div key={index}>
            <span className="text-white font-bold flex-start flex pl-2 py-3">
              Nombre: {paciente.name} | Apellido: {paciente.lastname} | DNI: {paciente.dni} | Email: {paciente.email} | Centro: {parseCentro(paciente.centro)}
            </span>
            <hr className='m' />
          </div>
        ))}
    </div> ) : ( <> <h1 className='text-white text-left font-bold flex-col p-4'> No hay ningún paciente que coincida con los criterios de búsqueda. </h1> </>)}
            
        </div>
      </div>
    </div>
  );
}

export default ReporteRegistrados;
