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



function VerPerfil() {

    let store = useStore().getState()
    let id = store.auth.uid

    const [perfil, setPerfil] = useState([])

    useEffect(() => {
        axios.get('http://localhost:4000/api/user/' + id)
        .then((res) => {
            console.log(res.data)
            setPerfil([res.data])
        })
    }, [])

    return (
            <div>
                <div className='text-white font-bold text-6xl p-2'>Mi información personal</div>
                {
                    Array.isArray(perfil) && perfil.map(info =>
                    <div className='text-white font-bold text-2xl p-2'> 
                        <h1>Nombre: {info.name}</h1> <hr className='m-4' />
                        <h1>Apellido: {info.lastname}</h1> <hr className='m-4' />
                        <h1>DNI: {info.dni}</h1> <hr className='m-4' />
                        <h1>Edad: {info.age}</h1> <hr className='m-4' />
                        <h1>Teléfono: {info.tel}</h1> <hr className='m-4' />
                        <h1>Fecha de nacimiento: {info.date}</h1> <hr className='m-4' />
                    </div>)
                }
            </div>
        //data && Array.isArray(data) && data.length > 0 && data.map((user, i) =>
    )

}


export default VerPerfil
