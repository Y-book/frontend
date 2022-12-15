import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './views/Navbar/Navbar';
import Home from './views/home/Home';
import Login from './views/login/Login';
import Signup from './views/signup/Signup';
import SignupCode from './views/signup/Signup-code';
import ListMessage from './views/message/ListMessage';
import Message from './views/message/Message';

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
          <Route path="/listMessage" element={<ListMessage />} />
          <Route path="/message" element={<Message />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
