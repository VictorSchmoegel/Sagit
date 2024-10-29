import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header"
import Landing from "./pages/Landing"
import Contact from "./pages/Contact";
import About from "./pages/About";
import Users from "./pages/Users";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";
import Projetos from "./pages/Projetos";
import ProjectPage from "./pages/ProjectPage";
import ColabPage from "./pages/ColabPage";
import Documents from "./pages/Documents";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/users" element={<Users />} />
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>}/>
        <Route path="/projetos" element={<PrivateRoute><Projetos /></PrivateRoute>} />
        <Route path="/projects/:id" element={<PrivateRoute><ProjectPage /></PrivateRoute>} />
        <Route path="/colabs/:colabId" element={<PrivateRoute><ColabPage /></PrivateRoute>} />
        <Route path="/documents" element={<PrivateRoute><Documents /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
