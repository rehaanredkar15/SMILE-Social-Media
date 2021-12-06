import './App.css';
import React,{useRef,useContext} from 'react'
import Home from './pages/home/Home.js';
import Profile from './pages/profile/Profile.js';
import Login from './pages/login/Login.jsx';
import Register from './pages/Register/Register.jsx';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import TopBar from './components/Topbar/Topbar.jsx';
import { AuthContext } from './Context/AuthContext';

function App() {

  const {user} = useContext(AuthContext);

  return (
    <>
      <BrowserRouter>
       <Routes>
         <Route path="/" element={user ? <Home/> : <Navigate to="/register"/> } />
         <Route path="/login" element={user ? <Navigate to="/"/> : <Login />   } />
         <Route path="/register" element={user ? <Navigate to="/"/> : <Register />} />
         <Route path="/profile/:username" element={<Profile/>} />
       </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
