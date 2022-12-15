import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './views/Navbar/Navbar';
import Home from './views/home/Home';
import Login from './views/login/Login';
import Signup from './views/signup/Signup';
import SignupCode from './views/signup/Signup-code';

function App() {

  return (
    <div className="App">
      <header className="App-header">
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/code" element={<SignupCode />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
