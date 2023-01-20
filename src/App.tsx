import './App.css';

import { UserAccountProvider } from "./provider/UserProvider";
import Router from "./router/Router";

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <UserAccountProvider>
          <Router />
        </UserAccountProvider>
      </header>
    </div>
  );
}

export default App;
