import React from 'react'
import { Stack, Container, Row, Col, Button } from 'react-bootstrap'

import firebaseApp from '../firebase';
import {
    getFirestore,
    doc,
    updateDoc
} from 'firebase/firestore';

const firestore = getFirestore(firebaseApp);

const ListadoProyectos = ({ arrayProyectos, correoUsuario, setArrayProyectos }) => {

    async function eliminarProyecto(idProyectoEliminar) {
        //crear nuevo array de proyectos
        const nvoArrayProyectos = arrayProyectos.filter(
            objetoProyecto => objetoProyecto.id !== idProyectoEliminar
        );
        //actualizar base de datos
        const docRef = doc(firestore, `proyectos-investigacion/${correoUsuario}`);
        updateDoc(docRef, { proyectos: [...nvoArrayProyectos] });
        //        actualizar el estado
        setArrayProyectos(nvoArrayProyectos);

    }

    return (

        <Container>
            <Stack>
                <h4>Convocatorias 2022</h4>
                <h5>Listado Proyectos</h5>

                {
                    arrayProyectos.map((objetoProyecto) => {
                        return (
                            <>
                                <Row className='mb-5' >
                                    <Col >
                                        {objetoProyecto.descripcion}
                                    </Col>

                                    <Col >
                                        <a href={objetoProyecto.url}>
                                            <Button
                                                variant="secondary"
                                            >
                                                Ver Proyecto
                                            </Button>
                                        </a>
                                    </Col>
                                    <Col>
                                        <Button
                                            variant="danger"
                                            onClick={() => eliminarProyecto(objetoProyecto.id)}

                                        >
                                            Eliminar Proyecto
                                        </Button>
                                    </Col>
                                </Row>
                            </>
                        )
                    }
                    )}

            </Stack>
        </Container>
    )
}

export default ListadoProyectos