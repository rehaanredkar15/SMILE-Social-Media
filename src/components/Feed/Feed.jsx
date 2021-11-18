import React from 'react'
import './Feed.css';
import Share from '../Share/Share.jsx';
import Post from '../Post/Post.jsx';
import {Posts} from '../../dummyData';


const Feed = () => {
    return (
        <div className = "FeedContainer">
            <div className="FeedWrapper">
              <div className="share">
              <Share/>
              </div>
              <div className="PostsWall">

             {Posts.map((p) => (
              <div className="postCover">
               <Post key={p.id} post={p}/>
              </div>))
             }
              </div>
            </div>
        </div>
    )
}

export default Feed
