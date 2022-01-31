import React from 'react';
import {useEffect,useState,useContext} from 'react';
import './EditPost.css';
import Feed from '../../components/Feed/Feed.jsx';
import SideBar from '../../components/Sidebar/Sidebar.jsx';
import RightBar from '../../components/Rightbar/RightBar.jsx';
import Share from '../../components/Share/Share.jsx';
import Post from '../../components/Post/Post.jsx';
import TopBar from '../../components/Topbar/Topbar.jsx';
import { AuthContext } from '../../Context/AuthContext';
import { PostContext } from '../../Context/PostContext/PostContext';
import {  useParams } from "react-router-dom";
import axios from 'axios';

const EditPost = () => {

      const { user} = useContext(AuthContext);
      const [Posts,setPosts]  = useState();

     const postId = useParams().postId;


                useEffect(() => {

         const fetchPost = async () => {
              const res = await axios.get("https://smilesocial.herokuapp.com/api/posts/" + postId )
            
           
              setPosts(res.data);
         }
         fetchPost();
     }, [postId])

    return (

        <>
         <TopBar/>
            <div className="EditContainer">

                 <SideBar/>

                    <div className = "FeedContainer">
                            <h1>EDIT YOUR POST</h1>
                            <div className="FeedWrapper">
                            <div className="share">
                            <Share postId = {postId}/>
                            </div>
                            <div className="PostsWall">
                                  <div className="postCover">
                                  {Posts && <Post  post={Posts}/>  } 
                                  </div>
                            </div>
                            </div>
                        </div>
                  <RightBar/>
                  
            </div>
        </>
    )
}

export default EditPost
