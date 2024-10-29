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
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/projetos" element={<Projetos />} />
        <Route path="/projects/:id" element={<ProjectPage />} />
        <Route path="/colabs/:colabId" element={<ColabPage />} />
        <Route path="/documents" element={<Documents />} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
