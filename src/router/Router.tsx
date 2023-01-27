import { Routes, Route } from 'react-router-dom';
import Home from '../views/home/Home';
import Login from '../views/login/Login';
import Signup from '../views/signup/Signup';
import SignupCode from '../views/signup/Signup-code';
import ResetPassword from '../views/login/ResetPassword';
import { UserAccountContext } from '../provider/UserProvider';
import NewsFeed from '../views/newsfeed/NewsFeed';
import React, { useContext, useEffect } from 'react';
import Navbar from '../views/Navbar/Navbar';
import { CircularProgress } from '@mui/material';
import './Router.css';
import Friendship from '../views/friendship/Friendship';
import Profile from '../views/profile/Profile';
import Conversations from '../views/conversations/Conversations';
import Messages from '../views/messages/Messages';

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
        {/* {connectedUser &&  */}
        <Navbar connectedUser={connectedUser}setConnectedUser={setConnectedUser} />
        {/* } */}
        {loading && <div className="loading"><CircularProgress /></div>}
        {!loading && 
          <Routes>
            {connectedUser && <Route path="/" element={<NewsFeed profile={false} type={''} />} />}
            {!connectedUser && <Route path="/" element={<Home />} />}

            {!connectedUser && <Route path="/login" element={<Login setConnectedUser={setConnectedUser} />} />}
            {!connectedUser && <Route path="/signup" element={<Signup />} />}
            {!connectedUser && <Route path="/code" element={<SignupCode />} />}
            {!connectedUser && <Route path="/reset-password" element={<ResetPassword />} />}

            {connectedUser && <Route path="/conversations" element={<Conversations />} />}
            {connectedUser && <Route path="/conversation" element={<Messages />} />}
            {connectedUser && <Route path="/friendship" element={<Friendship />} />}
            {connectedUser && <Route path="/profile" element={<Profile />} />}
          </Routes>}
    </div>
  );
}

export default Router;
