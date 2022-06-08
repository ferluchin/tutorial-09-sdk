import React, { useState } from 'react'
import { Stack, Container, Form, Button } from 'react-bootstrap';

import firebaseApp from '../firebase';

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword, 
    signInWithRedirect,
    GoogleAuthProvider,
} from "firebase/auth"

const auth = getAuth(firebaseApp);

const googleProvider = new GoogleAuthProvider();

function Logueo() {
    const [estaRegistrado, setEstaRegistrado] = useState(false);

    async function submitHandler(event) {
        event.preventDefault();
        const correo = event.target.formBasicEmail.value;
        const password = event.target.formBasicPassword.value;

        if (estaRegistrado) {
            // si se registra
            const usuario = await createUserWithEmailAndPassword(
                auth,
                correo,
                password
            );
        } else {
            // si esta iniciando sesión
            signInWithEmailAndPassword(auth, correo, password);
        }


    }

    return (
        <Container>
            <Stack gap={3}>
                <h1>
                    {estaRegistrado ? "Regístrate" : "Inicia Sesión"}

                </h1>
                <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />

                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        {estaRegistrado ? "Regístrate" : "Inicia Sesión"}
                    </Button>
                </Form>
                <Button variant="primary"
                    type="submit"
                    style={{ width: "300px" }}
                    onClick={() => signInWithRedirect(auth, googleProvider)}
                >
                    Acceder con Google
                </Button>

                <Button
                    variant="primary"
                    type="submit"
                    onClick={() => setEstaRegistrado(!estaRegistrado)}
                    style={{ width: "300px" }}
                >
                    {estaRegistrado ? "¿ya tienes cuenta? Inicia Sesión" : "¿No tienes cuenta? Registrarme"}
                </Button>
            </Stack>
        </Container>
    )
}

export default Logueo