import React,{useEffect,useState,useContext} from 'react'
import './Explore.css';
import Feed from '../../components/Feed/Feed.jsx';
import Post from '../../components/Post/Post.jsx';
import SideBar from '../../components/Sidebar/Sidebar.jsx';
import RightBar from '../../components/Rightbar/RightBar.jsx';
import TopBar from '../../components/Topbar/Topbar.jsx';
import axios from 'axios';

const Explore = () => {
          
          const [ExplorePosts,setExplorePosts]  = useState([]);

     useEffect(() => {
         const fetchPost = async () => {
              const res = await axios.get("/posts/explore");

            setExplorePosts(res.data.sort((p1,p2)=>{
                return new Date(p1.createdAt)  - new Date(p2.createdAt);
            })
            );
         }
         fetchPost();
     }, [])





    return (
         <>
         <TopBar/>
            <div className="EditContainer">
                 <SideBar/>
                    <div className = "FeedContainer">
                            <h1>Explore</h1>
                            <div className="FeedWrapper">
                            <div className="share">
                            </div>
                            <div className="PostsWall">
                               
                                {ExplorePosts.map((p) => (
                                   <div className="postCover">
                                        <Post key={p._id} post={p}/>
                                   </div>))
                                       }
                            </div>
                            </div>
                        </div>
                  <RightBar/>
                  
            </div>
            </>
    )
}

export default Explore