import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './views/Navbar/Navbar';
import Home from './views/home/Home';
import Login from './views/login/Login';
import Signup from './views/signup/Signup';
import SignupCode from './views/signup/Signup-code';
import ResetPassword from './views/login/ResetPassword';
import { UserAccountProvider } from './provider/UserProvider';

function App() {

  return (
    <div className="App">
      <header className="App-header">
      <UserAccountProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/code" element={<SignupCode />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </UserAccountProvider>
      </header>
    </div>
  );
}

export default App;
