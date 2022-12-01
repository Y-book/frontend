import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './views/Home';
import Navbar from './views/Navbar/Navbar';

function App() {

  return (
    <div className="App">
      <header className="App-header">
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
