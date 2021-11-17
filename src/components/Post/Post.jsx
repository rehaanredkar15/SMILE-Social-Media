import React from 'react';
import './Post.css';
import MoreVertIcon from '@mui/icons-material/MoreVert';


const Post = () => {
    return (
        <div className="post">

         {/* post start */}
          <div className="postWrapper">
              <div className="postTop">
                  <div className="postTopLeft">
                     <div  >
                     <img className = "postProfileImg" src="/Assets/profilepic.jpg" alt="" />
                     </div>
                     <div className="postDetails">
                      <span className="postUserName"> Rehaan Redkar</span>
                      <span className="postTime">4 mins ago</span>
                      </div>
                  </div>
                    <div className="moreOptions">
                      <MoreVertIcon/>
                     </div>
                </div>

              <div className="postCenter">
                 <div className="postText">Hey Guys Vas Happennin</div>
                 <img src="/Assets/profilepic.jpg" alt="" className="postImg" />
              </div>

                <div className="postBottom">  
                 <div className="postBottomLeft">
                  <img src="/Assets/like.png" alt="" className="likeIcon" />
                  <img src="/Assets/heart.png" alt="" className="likeIcon" />
                  <span className="postLikeCounter">32 people liked  </span>
                 </div>

                 <div className="postBottomRight">
                     <div className="postCommentText">
                        9 Comments
                     </div>
                 </div>
                </div>
            </div>

            {/* post end */}

             
        </div>
    )
}

export default Post
