import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './views/home/Home';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
