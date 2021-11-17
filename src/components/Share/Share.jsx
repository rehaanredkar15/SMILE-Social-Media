import React from 'react';
import PhotoSizeSelectActualTwoToneIcon from '@mui/icons-material/PhotoSizeSelectActualTwoTone';
import './Share.css';
import SentimentSatisfiedTwoToneIcon from '@mui/icons-material/SentimentSatisfiedTwoTone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Share = () => {
    return (
        <div className = "share">
            <div className="shareWrapper">
              <div className="shareTop">
               <div className="profileDiv"> 
               <img className = "shareProfileImg" src="/Assets/profilepic.jpg" alt="" />
               </div>
                <input placeholder="What's in your mind Babe?" className = "shareInput" />
              </div>
              <hr className="shareHr"/>
              <div className="shareBottom">
                   <div className="shareOptions">

                     <div className="shareOption">
                        <PhotoSizeSelectActualTwoToneIcon  htmlColor="tomato" className = "shareIcon"/>
                      <div>
                        <span className = "shareOptionText">Photo or Video</span>
                       </div>
                     </div>


                     <div className="shareOption">
                        <LocationOnIcon className = "shareIcon"  htmlColor="green"/>
                     <div>
                        <span className = "shareOptionText">Location</span>
                     </div> 
                     </div>

                     <div className="shareOption">
                     <SentimentSatisfiedTwoToneIcon  htmlColor="goldenrod" className = "shareIcon"/>
                      <div>
                      <span className = "shareOptionText">Feeling</span>
                      </div>
                     </div>


                     <div className="PostButton">
                       <button className="shareButton">Post</button>
                     </div>
                   </div>
               </div>
            </div>
        </div>
    )
}

export default Share
