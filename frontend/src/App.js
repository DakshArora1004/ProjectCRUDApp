import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home';
import About from './components/about';
import Create from './components/create';
import Navbar from './components/Navbar';
import Edit from './components/edit';
import Delete from './components/delete';

function App() {
  const width = 240;
  return (
    <div className="App">
    <Navbar drawerWidth = {width}
      content = {
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/create" element={<Create />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/delete/:id" element={<Delete />} />
      </Routes>
      }

    />

    </div>
  );
}

export default App;
