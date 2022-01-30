import React,{useEffect} from 'react'
import './Home.css';
import Feed from '../../components/Feed/Feed.jsx';
import SideBar from '../../components/Sidebar/Sidebar.jsx';
import RightBar from '../../components/Rightbar/RightBar.jsx';
import TopBar from '../../components/Topbar/Topbar.jsx';
import {  LoginDetails } from '../APICalls';

const Home = ({socket}) => {
   
        const user = localStorage.getItem('user');
     


    return (
        <>
            <TopBar/>
            
            <div className="homeContainer">
            <SideBar />
             <Feed socket={socket}/>
             <RightBar socket={socket} />
            </div>
        </>
    )
}

export default Home