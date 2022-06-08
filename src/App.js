import React, { useState, useEffect } from "react";
import Home from "./components/Home";
import Logueo from "./components/Logueo";

import firebaseApp from "./firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const auth = getAuth(firebaseApp);

function App() {

  const [usuarioGlobal, setUsuarioGlobal] = useState(null);

  onAuthStateChanged(auth, (usuarioFirebase) => {
    if (usuarioFirebase) {
      //codigo en caso de que se haya iniciado sesión
      setUsuarioGlobal(usuarioFirebase);
    } else {
      //código en caso de que no se haya iniciado sesión
      setUsuarioGlobal(null);
    }
  });
  return (
    <>
      {usuarioGlobal ?
        <Home correoUsuario={usuarioGlobal.email} />
        :
        <Logueo />
      }
    </>
  );
}

export default App;
