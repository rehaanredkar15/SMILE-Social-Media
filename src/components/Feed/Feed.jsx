import React from 'react'
import './Feed.css';
import Share from '../Share/Share.jsx';
import Post from '../Post/Post.jsx';

const Feed = () => {
    return (
        <div className = "FeedContainer">
            <div className="FeedWrapper">
              <div className="share">
              <Share/>
              </div>
              <div className="PostsWall">
              <div className="postCover">
               <Post/>
              </div>
              <div className="postCover">
               <Post/>
              </div>
              <div className="postCover">
               <Post/>
              </div>
              <div className="postCover">
               <Post/>
              </div>
              </div>
            </div>
        </div>
    )
}

export default Feed
