import React,{useContext,useRef,useState,useEffect} from 'react';
import PhotoSizeSelectActualTwoToneIcon from '@mui/icons-material/PhotoSizeSelectActualTwoTone';
import SentimentSatisfiedTwoToneIcon from '@mui/icons-material/SentimentSatisfiedTwoTone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { AuthContext } from '../../Context/AuthContext';
import { CircularProgress } from "@material-ui/core";
import axios from 'axios';
import {  PostCall } from '../../pages/APICalls';
import { Link } from "react-router-dom";
import {
  PermMedia,
  Label,
  Room,
  EmojiEmotions,
  Cancel,
} from "@material-ui/icons";
import './ShareModal.css';
import { useNavigate,useParams } from "react-router-dom";




const ShareModal = ({ OpeningModal }) => {
     const {user} = useContext(AuthContext);
     
      const users = JSON.parse(localStorage.getItem('user'));
          const navigate = useNavigate();
     const initialState = { email:users.email ,username:users.username,fullname:users.fullname,city:users.city, from:users.from ,contact:users.contact ,desc:users.desc };
     const [Form, setForm] = useState(initialState)
    
      

      const handleClick = (e) => {
     

     e.preventDefault();

        const fetchUser = async () => {
              const res = await axios.put("http://localhost:5000/api/user/"+user._id,Form)

              localStorage.setItem('user',JSON.stringify(res.data));
         }

         fetchUser();



     OpeningModal(false);
     navigate('/login');
   }

        const handleChange = (e) => setForm({ ...Form, [e.target.name]: e.target.value });

       
     return(

       <div className = "ModalContainer">
            <div className="ModalWrapper">
            <form onSubmit={handleClick} className="ModalLogin">
                <input placeholder={users.username ? users.username : "Enter your Username"} name="username" type="text" onChange={handleChange}  className="loginInput" />
                <input placeholder={ users.fullname ? users.fullname : "Enter your Fullname"} name="fullname" type="text" onChange={handleChange}  className="loginInput" />
                <input placeholder={users.desc ? users.desc : "Enter Your description "} name = "desc" type="text" onChange={handleChange} className="loginInput" />
                <input placeholder={users.from ? users.from : "Enter your country"}  type = "text"  name="from" onChange={handleChange}  className="loginInput" />
                <input placeholder={users.city ? users.city : "Enter your city"}  type="text" name="city" onChange={handleChange}  className="loginInput" />
                <input placeholder={users.contact ? users.contact : "Enter your Phone Number"}  type = "text" name="contact" onChange={handleChange}    className="loginInput" />
                <input placeholder={users.email ? users.email : "Enter your Email"}  type = "text"  name="email" onChange={handleChange} className="loginInput" />

                <button className="ModalButton" type="submit" onClick={handleClick} >
                  Update
                </button>
              </form>
             </div> 
        </div>
        // </div>
     )
    
}

export default ShareModal;
