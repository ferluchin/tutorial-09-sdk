import React from 'react'
import { Container, Form, Col, Row, Button } from 'react-bootstrap'

import firebaseApp from '../firebase';
import { getFirestore, updateDoc, doc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);


const AgregarProyecto = ({ correoUsuario, setArrayProyectos, arrayProyectos }) => {

    let urlDescarga;

    async function addTask(e) {
        e.preventDefault();

        const descripcion = e.target.formDescripcion.value;
        //crear nuevo array de tareas
        const nvoArrayProyectos = [
            ...arrayProyectos,
            {
                id: +new Date(),
                descripcion: descripcion,
                url: "urlDescarga",
            }
        ];
        //actualizar base de datos
        const docuRef = doc(firestore, `proyectos-investigacion/${correoUsuario}`);
        updateDoc(docuRef, { proyectos: [...nvoArrayProyectos] });

        // actualizar el estado
        setArrayProyectos(nvoArrayProyectos);

        //limpiar formulario
        e.target.formDescripcion.value = "";
    }

    /* async function fileHandler(e) {
         //detectar archivo
        const archivoLocal = e.target.files[0];
        //cargarlo a firebase storage
        //const archivoRef = ref(storage, `${correoUsuario}/${archivoLocal.name}`);
        const archivoRef = ref(storage, `documentos/${archivoLocal.name}`);
        await uploadBytes(archivoRef, archivoLocal);
         //obtener la url de descarga del archivo    
        urlDescarga = await getDownloadURL(archivoRef);

    }
     */
    return (

        <Container>
            <h4>Agregar Proyecto</h4>
            <Form onSubmit={addTask}>
                <Row className='mb-5'>
                    <Col>
                        <Form.Control
                            type="text"
                            placeholder="Describe tu proyecto"
                            id='formDescripcion'
                        />
                    </Col>
                    <Col>
                        <Form.Control
                            type="text"
                            placeholder="Añade texto"
                            //onChange={fileHandler}
                            id= 'formTexto'
                        />
                    </Col>

                    <Col>
                        <Button
                            type='submit'
                        >
                            Agregar
                        </Button>
                    </Col>
                </Row>
            </Form>
            <hr />
        </Container>
    )
}

export default AgregarProyecto