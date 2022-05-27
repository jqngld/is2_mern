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


function VerTurnos() {

    let store = useStore().getState()
    let id = store.auth.uid

    const [turnos, setTurnos] = useState([])

    useEffect(() => {
        axios.get('http://localhost:4000/api/turno/' + id)
        .then((res) => {
            console.log(res)
            setTurnos(res.data.turnos)
        })
    }, [])

    const getTurnos = () => {
        axios.get('http://localhost:4000/api/turno/' + id)
        .then((res) => {
            console.log(res)
        })
    }

    return (
            <div className='text-white text-left font-bold text-2xl flex-col p-4'>
                {
                    Array.isArray(turnos) && turnos.map(turno =>
                    <div> 
                        <h1>
                            {turno.vax}: {turno.dateString} 
                        </h1>
                        <br></br>
                    </div>)
                }
            </div>
        //data && Array.isArray(data) && data.length > 0 && data.map((user, i) =>
    )

}


export default VerTurnos
