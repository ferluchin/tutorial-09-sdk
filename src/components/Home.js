import React, { useState, useEffect } from 'react'
import firebaseApp from '../firebase'
import { getAuth, signOut } from 'firebase/auth'

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
} from 'firebase/firestore';

import { Container, Button } from "react-bootstrap"

import AgregarTarea from './AgregarTarea';
import ListadoTareas from './ListadoTareas';
import ListadoProyectos from './ListadoProyectos';
import AgregarProyecto from './AgregarProyecto';

const auth = getAuth(firebaseApp);

const firestore = getFirestore(firebaseApp);

const Home = ({ correoUsuario }) => {

    const [arrayTareas, setArrayTareas] = useState(null);

    //console.log(correoUsuario);
    const [arrayProyectos, setArrayProyectos] = useState(null);


    const fakeData = [
        { id: 1, descripcion: 'Tarea 1', url: 'https://www.picsum.photos/420' },
    ]



    async function buscarProyectoOrCrearProyecto(idDocumento) {
        //crear referencia al documento
        const docuRef = doc(firestore, `usuarios/${idDocumento}`);

        //Buscar documento
        const consulta = await getDoc(docuRef);

        //revisar si existe
        if (consulta.exists()) {
            // si sí existe 
            const infoDocu = consulta.data();
            return infoDocu.proyectos;
        } else {
            // si no existe
            await setDoc(docuRef, { tareas: [...fakeData] })
            const consulta = await getDoc(docuRef);
            const infoDocu = consulta.data();
            //return infoDocu.proyectos;
            return infoDocu.tareas;

        }
    }


    useEffect(() => {
        async function obtenerProyectos() {
            const proyectosFetchadas = await buscarProyectoOrCrearProyecto(
                correoUsuario
            );
            setArrayProyectos(proyectosFetchadas);
        }
        obtenerProyectos();
    }, [])

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
            <br />
            <h4>
                Hola Administrador, sesión iniciada
            </h4>
            <Button
                onClick={() => signOut(auth)}
            >
                cerrar sesión
            </Button>
            <hr />

            <AgregarProyecto
                arrayProyectos={arrayProyectos}
                setArrayProyectos={setArrayProyectos}
                correoUsuario={correoUsuario}

            />
            {console.log (arrayProyectos)}
            {

                arrayProyectos ?
                    <ListadoProyectos
                        arrayProyectos={arrayProyectos}
                        setArrayProyectos={setArrayProyectos}
                        correoUsuario={correoUsuario}

                    />
                    : null
            }
            <hr />

            <AgregarTarea
                arrayTareas={arrayTareas}
                setArrayTareas={setArrayTareas}
                correoUsuario={correoUsuario}

            />

            {console.log(arrayTareas)}
            {
                
                arrayTareas ?
            <ListadoTareas
                arrayTareas={arrayTareas}
                setArrayTareas={setArrayTareas}
                correoUsuario={correoUsuario}

            />
            : null
            }
        </Container>
    )
}

export default Home