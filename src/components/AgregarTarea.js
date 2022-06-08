import { async } from '@firebase/util'
import firebaseApp from '../firebase';
import { getFirestore, updateDoc, doc } from 'firebase/firestore';
import React from 'react'
import { Container, Form, Col, Row, Button } from 'react-bootstrap'

const firestore = getFirestore(firebaseApp);
const AgregarTarea = ({ correoUsuario, setArrayTareas, arrayTareas }) => {
    async function addTask(e) {
        e.preventDefault();

        const descripcion = e.target.formDescripcion.value;
        //crear nuevo array de tareas
        const nvoArrayTareas = [
            ...arrayTareas,

            {
                id: +new Date(),
                descripcion: descripcion,
                url: "https://picsum.photos/420"
            }];
        //actualizar base de datos
        const docuRef = doc(firestore, `usuarios/${correoUsuario}`);
        updateDoc(docuRef, { tareas: [...nvoArrayTareas] });

        // actualizar el estado
        setArrayTareas(nvoArrayTareas);

        //limpiar formulario
        e.target.formDescripcion.value = "";
    }

    return (
        <Container>
            <Form onSubmit={addTask}>
                <Row>
                    <Col>
                        <Form.Control type="text" placeholder="Describe tu tarea" id='formDescripcion' />
                    </Col>
                    <Col>
                        <Form.Control type="file" placeholder="Añade Archivo" />
                    </Col>

                    <Col>
                        <Button type='submit'>Agregar</Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}

export default AgregarTarea