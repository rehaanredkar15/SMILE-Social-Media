import './App.css';
import React,{useRef,useContext,useEffect,useState} from 'react'
import Home from './pages/home/Home.js';
import EditPost from './pages/EditPost/EditPost.jsx';
import Chat from './pages/Chat/Chat.jsx';
import Explore from './pages/Explore/Explore.jsx';
import Profile from './pages/profile/Profile.js';
import UserProfile from './pages/userprofile/UserProfile.js';
import Login from './pages/login/Login.jsx';
import ResetPassword from './pages/ResetPassword/ResetPassword.jsx';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword.jsx';
import Register from './pages/Register/Register.jsx';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import TopBar from './components/Topbar/Topbar.jsx';
import { AuthContext } from './Context/AuthContext';
import { io } from "socket.io-client";

function App() {

  const {user} = useContext(AuthContext);
   const [socket, setSocket] = useState(null);


  useEffect(() => {

    setSocket(io("ws:https://smilesocketapp.herokuapp.com/"));
  }, []);
  return (
    <>
      <BrowserRouter>
       <Routes>
         <Route path="/" element={user ? <Home  socket={socket} /> : <Navigate to="/login"/> } />
         <Route path="/login" element={user ? <Navigate to="/"/> : <Login />   } />
   b      <Route path="/register" element={user ? <Navigate to="/"/> : <Register />} />
         <Route path="/login/forgotPassword" element={user ? <Navigate to="/"/> : <ForgotPassword/>} />
         <Route path="/resetpassword/:resetToken" element={user ? <Navigate to="/"/> : <ResetPassword/> } /> 
         <Route path="/profile/:username" element={user ? <Profile/> : <Navigate to="/login"/>} />
         <Route path="/userProfile/:username" element={user ? <UserProfile/> : <Navigate to="/login"/>}/>
         <Route path ="/posts/:postId" element={user ?  <EditPost/>: <Navigate to="/login"/>} />
         <Route path ="/explore" element={user ?  <Explore/>: <Navigate to="/login"/>} />
         <Route path ="/chatSection" element={user ?  <Chat  socket={socket} />: <Navigate to="/login"/>} />
         <Route path="*" element={user ? <Navigate to="/"/> : <Login /> } />
       </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
