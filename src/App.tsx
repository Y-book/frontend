import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './views/home/Home';
import Login from './views/login/Login';
import Signup from './views/signup/Signup';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
