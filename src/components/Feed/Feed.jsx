import React,{useEffect,useState,useContext} from 'react';
import './Feed.css';
import Share from '../Share/Share.jsx';
import Post from '../Post/Post.jsx';
// import {Posts} from '../../dummyData';
import axios from 'axios';
import { AuthContext } from '../../Context/AuthContext';
import { PostContext } from '../../Context/PostContext/PostContext';




const Feed = ({username,socket}) => {
     const { user } = useContext(AuthContext);
     const { post:UserPost } = useContext(PostContext);
     const [posts,setPosts]  = useState([]);
     const [error,SetError]  = useState(false);
     const [Fetching,SetFetching] = useState(true);


     useEffect(() => {
         const fetchPost = async () => {

             try {

                   const res = username ?  await axios.get("/posts/profile/"+username) : await axios.get("/posts/timeline/" + user._id )
                    setPosts(res.data.sort((p1,p2)=>{
                        return new Date(p2.createdAt)  - new Date(p1.createdAt);
                    })
                    );
                    res.data && SetFetching(false);
                    SetError(false);
                 
             } catch (error) {
                 console.log(error.message);
                 SetError(true);
                 SetFetching(false);
             }
            
         }
         fetchPost();
     }, [username,user._id,UserPost])
   
     useEffect(() => {
      window.scrollTo(0, 0)
    }, [])


    return (
       <>
      

        <div className = "FeedContainer">
            <div className="FeedWrapper">
              <div className="share">
              { (!username || username === user.username) && <Share/>}
              </div>
              <div className="PostsWall" >
              { 
               error &&  <div className="Error" >
                <img 
               src="http://localhost:3000/Assets/person/nointernet.gif"
               alt="" 
               className="image"/> 
              </div>
                 }
             { Fetching ?
             ( 
               <>
             <h1>Fetching Your Posts...</h1>
              <div className="Error" > 
              <img 
               src="http://localhost:3000/Assets/person/fetching.gif"
               alt="" 
               className="fetching"/> 
              </div>
              </>
             )
              :  posts.map((p) => (
              <div className="postCover">
               <Post key={p._id} post={p} socket={socket}/>
              </div>))
              
              


             }
             
              </div>
            </div>
        </div>
        </>
    )
}

export default Feed
