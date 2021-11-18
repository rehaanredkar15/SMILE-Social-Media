import React from 'react';
import './Post.css';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {Users} from '../../dummyData';



const Post = ({post}) => {

    return (
        <div className="post">

         {/* post start */}
          <div className="postWrapper">
              <div className="postTop">
                  <div className="postTopLeft">
                     <div  >                     
                     <img className = "postProfileImg" src={ Users.filter((u) =>u.id === post.userId)[0].profilePicture} alt="" />
                     </div>
                     <div className="postDetails">
                      <span className="postUserName"> 
                    { 
                       Users.filter((u) =>u.id === post.userId)[0].username
                    }
                         </span>
                      <span className="postTime">{post.date}</span>
                      </div>
                  </div>
                    <div className="moreOptions">
                      <MoreVertIcon/>
                     </div>
                </div>

              <div className="postCenter">
                 <div className="postText">{post.desc}</div>
                 <img src={post.photo} alt="" className="postImg" />
              </div>

                <div className="postBottom">  
                 <div className="postBottomLeft">
                  <img src="/Assets/like.png" alt="" className="likeIcon" />
                  <img src="/Assets/heart.png" alt="" className="likeIcon" />
                  <span className="postLikeCounter">{post.like}</span>
                 </div>

                 <div className="postBottomRight">
                     <div className="postCommentText">
                        {post.comment} Comments
                     </div>
                 </div>
                </div>
            </div>

            {/* post end */}

             
        </div>
    )
}

export default Post
