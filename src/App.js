import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './components/pages/Home';
import Empresa from './components/pages/Empresa';
import Contato from './components/pages/Contato';
import NovoProjeto from './components/pages/NovoProjeto';
import Container from './components/Layout/Container';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Projects from './components/pages/Projects.js';
import Project from './components/pages/Project';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route exact path="/" element={<Container customClass='min-height'><Home /></Container>} />
        <Route path="/projects" element={<Container customClass='min-height'><Projects /></Container>} />
        <Route path="/empresa" element={<Container customClass='min-height'><Empresa /></Container>} />
        <Route path="/contato" element={<Container customClass='min-height'><Contato /></Container>} />
        <Route path="/novoprojeto" element={<Container customClass='min-height'><NovoProjeto /></Container>} />
        <Route path="/project/:id" element={<Container customClass='min-height'><Project /></Container>} />
      </Routes>
      <Footer/>
    </Router>
  )
}

export default App;


