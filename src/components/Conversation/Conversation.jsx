import React ,{useEffect,useState} from 'react'
import  "./Conversation.css";
import axios from 'axios';

const Conversation = ({ conversation, currentUser }) => {


    const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios.get("https://smilesocial.herokuapp.com/api/user?userId=" + friendId);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);




    return (
       <div className="conversation">
      <img
        className="conversationImg"
        src={
          user?.profilePicture
            ? user.profilePicture
            :  "https://raw.githubusercontent.com/rehaanredkar15/SMILE-Social-Media/master/public/Assets/person/user.webp"
        }
        alt=""
      />
      <span className="conversationName">{user?.username}</span>
    </div>
    )
}

export default Conversation
