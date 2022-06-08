import React, { useState, useEffect } from 'react'
import firebaseApp from '../firebase'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'

import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore';

import { Container, Button } from "react-bootstrap"
import AgregarTarea from './AgregarTarea';
import ListadoTareas from './ListadoTareas';
import { async } from '@firebase/util';

const auth = getAuth(firebaseApp);

const firestore = getFirestore(firebaseApp);

const Home = ({ correoUsuario }) => {

    const [arrayTareas, setArrayTareas] = useState(null);
    //console.log(correoUsuario);

    const fakeData = [
        { id: 1, descripcion: 'Tarea 1', url: 'https://www.picsum.photos/420' },
        { id: 2, descripcion: 'Tarea 2', url: 'https://www.picsum.photos/420' },
        { id: 3, descripcion: 'Tarea 3', url: 'https://www.picsum.photos/420' },
    ]

    async function buscarDocumentoOrCrearDocumento(idDocumento) {
        //crear referencia al documento

        const docuRef = doc(firestore, `usuarios/${idDocumento}`);

        //Buscar documento
        const consulta = await getDoc(docuRef);

        //revisar si existe
        if (consulta.exists()) {
            // si sí existe 
            const infoDocu = consulta.data();
            return infoDocu.tareas;
        } else {
            // si no existe
            await setDoc(docuRef, { tareas: [...fakeData] })
            const consulta = await getDoc(docuRef);
            const infoDocu = consulta.data();
            return infoDocu.tareas;

        }
    }

    useEffect(() => {
        async function obtenerTareas() {
            const tareasFetchadas = await buscarDocumentoOrCrearDocumento(
                correoUsuario
            );
            setArrayTareas(tareasFetchadas);
        }
        obtenerTareas();
    }, [])

    return (
        <Container>
            <h4>
                Hola, sesión iniciada
            </h4>
            <button
                onClick={() => signOut(auth)}
            >
                cerrar sesión
            </button>
            <AgregarTarea
                arrayTareas={arrayTareas}
                setArrayTareas={setArrayTareas}
                correoUsuario={correoUsuario}

            />
            {
                arrayTareas ?
                    <ListadoTareas
                        arrayTareas={arrayTareas}
                        setArrayTareas={setArrayTareas}
                        correoUsuario={correoUsuario}

                    />
                    : null
            }

            <hr />

        </Container>
    )
}

export default Home