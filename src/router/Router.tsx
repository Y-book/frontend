import { Routes, Route } from 'react-router-dom';
import Home from '../views/home/Home';
import Login from '../views/login/Login';
import Signup from '../views/signup/Signup';
import SignupCode from '../views/signup/Signup-code';
import ListMessage from '../views/messaging/ListMessage';
// import { io } from "socket.io-client";
import ResetPassword from '../views/login/ResetPassword';
import { UserAccountContext } from '../provider/UserProvider';
import NewsFeed from '../views/newsfeed/NewsFeed';
import React, { useContext, useEffect } from 'react';
import Navbar from '../views/Navbar/Navbar';
import { CircularProgress } from '@mui/material';
import './Router.css';
import Friendship from '../views/friendship/Friendship';

function Router() {
  const {getValidSession} = useContext(UserAccountContext)
  const [loading, setLoading] = React.useState(true);
  const [connectedUser, setConnectedUser] = React.useState(false);
    
  useEffect(() => {
    const session = getValidSession()
    
    if (session) {
      setConnectedUser(true);
    }
    setLoading(false);
  }, [getValidSession]);

  return (
    <div className="Router">
        <Navbar setConnectedUser={setConnectedUser} />
        {loading && <div className="loading"><CircularProgress /></div>}
        {!loading && 
          <Routes>
            {connectedUser && <Route path="/" element={<NewsFeed />} />}
            {!connectedUser && <Route path="/" element={<Home />} />}

            {!connectedUser && <Route path="/login" element={<Login setConnectedUser={setConnectedUser} />} />}
            {!connectedUser && <Route path="/signup" element={<Signup />} />}
            {!connectedUser && <Route path="/code" element={<SignupCode />} />}
            {!connectedUser && <Route path="/reset-password" element={<ResetPassword />} />}

            {connectedUser && <Route path="/listMessage" element={<ListMessage />} />}
            {/* // <Route path="message" element={<ChatPage socket={socket} />} /> */}
            {connectedUser && <Route path="/friendship" element={<Friendship />} />}
          </Routes>}
    </div>
  );
}

export default Router;
