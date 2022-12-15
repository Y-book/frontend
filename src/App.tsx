import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './views/Navbar/Navbar';
import Home from './views/home/Home';
import ListMessage from './views/message/ListMessage';
import Message from './views/message/Message';

function App() {

  return (
    <div className="App">
      <header className="App-header">
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listMessage" element={<ListMessage />} />
          <Route path="/message" element={<Message />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
