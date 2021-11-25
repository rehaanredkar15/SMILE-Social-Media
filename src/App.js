import './App.css';
import Home from './pages/home/Home.js';
import Profile from './pages/profile/Profile.js';
import Login from './pages/login/Login.jsx';
import Register from './pages/Register/Register.jsx';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import TopBar from './components/Topbar/Topbar.jsx';


function App() {
  return (
    <>
      <BrowserRouter>
       <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/signup" element={<Register />} />
         <Route path="/login" element={<Login />} />
         <Route path="/profile/:username" element={<Profile/>} />
       </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
