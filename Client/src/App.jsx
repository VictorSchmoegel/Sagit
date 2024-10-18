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
        <Route path="/projetos" element={<Projetos />} />
        <Route path="/projects/:id" element={<ProjectPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
