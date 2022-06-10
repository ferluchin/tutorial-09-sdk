import React from 'react'
import { Stack, Container, Row, Col, Button } from 'react-bootstrap'

import firebaseApp from '../firebase';
import {
    getFirestore,
    doc,
    updateDoc
} from 'firebase/firestore';

const firestore = getFirestore(firebaseApp);

const ListadoTareas = ({ arrayTareas, correoUsuario, setArrayTareas }) => {

    async function eliminarTarea(idTareaEliminar) {
        // crear nuevo array de tareas

        const nvoArrayTareas = arrayTareas.filter(
            objetoTarea => objetoTarea.id !== idTareaEliminar
        );
        //actualizar base de datos

        const docRef = doc(firestore, `usuarios/${correoUsuario}`);
        updateDoc(docRef, { tareas: [...nvoArrayTareas] });
        //        actualizar el estado
        setArrayTareas(nvoArrayTareas);

    }

    return (

        <Container>
            <Stack>

                {arrayTareas.map((objetoTarea) => {
                    return (
                        <>
                            <Row className='mb-5' >
                                <Col>
                                    {objetoTarea.descripcion}
                                </Col>
                                
                                <Col >
                                    <a href={objetoTarea.url}>
                                        <Button
                                            variant="secondary"
                                        >
                                            Ver Archivo
                                        </Button>
                                    </a>
                                </Col>
                                <Col>
                                    <Button
                                        variant="danger"
                                        onClick={() => eliminarTarea(objetoTarea.id)}
                                        
                                    >
                                        Eliminar Tarea
                                    </Button>
                                </Col>
                            </Row>
                            <hr />
                        </>
                    )
                }
                )}

            </Stack>
        </Container>
    )
}

export default ListadoTareas