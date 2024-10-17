import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header"
import Landing from "./pages/Landing"
import Contact from "./pages/Contact";
import About from "./pages/About";
import Users from "./pages/Users";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";
import Araraquara from "./pages/Araraquara";
import Divinopolis from "./pages/Divinopolis";
import EntregaDeNovos from "./pages/EntregaDeNovos";
import Klabin from "./pages/Klabin";
import Imperatriz from "./pages/Imperatriz";
import PedroLeopoldo from "./pages/PedroLeopoldo";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/users" element={<Users />} />
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/araraquara" element={<Araraquara />} />
        <Route path="/divinopolis" element={<Divinopolis />} />
        <Route path="/entregadenovos" element={<EntregaDeNovos />} /> 
        <Route path="/klabin" element={<Klabin />} />
        <Route path="/imperatriz" element={<Imperatriz />} />
        <Route path="/pedroleopoldo" element={<PedroLeopoldo />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
