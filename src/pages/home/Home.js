import React from 'react'
import './Home.css';
import Feed from '../../components/Feed/Feed.jsx';
import SideBar from '../../components/Sidebar/Sidebar.jsx';
import RightBar from '../../components/Rightbar/RightBar.jsx';
import TopBar from '../../components/Topbar/Topbar.jsx';

const Home = () => {
    return (
        <>
            <TopBar/>
            <div className="homeContainer">
            <SideBar/>
             <Feed/>
             <RightBar/>
            </div>
        </>
    )
}

export default Home