import React,{useEffect,useState,useContext} from 'react'
import './Feed.css';
import Share from '../Share/Share.jsx';
import Post from '../Post/Post.jsx';
// import {Posts} from '../../dummyData';
import axios from 'axios';
import { AuthContext } from '../../Context/AuthContext';




const Feed = ({username}) => {

     const { user} = useContext(AuthContext);
     const [posts,setPosts]  = useState([]);


     useEffect(() => {
         const fetchPost = async () => {
              const res = username ? await axios.get("/posts/profile/"+username) : await axios.get("/posts/timeline/" + user._id )
             //here the fetch function is required to make the api request 
            setPosts(res.data);
           
        
         }
         fetchPost();
     }, [username,user._id])
 

    return (
        <div className = "FeedContainer">
            <div className="FeedWrapper">
              <div className="share">
              <Share/>
              </div>
              <div className="PostsWall">

             {posts.map((p) => (
              <div className="postCover">
               <Post key={p._id} post={p}/>
              </div>))
             }
              </div>
            </div>
        </div>
    )
}

export default Feed
