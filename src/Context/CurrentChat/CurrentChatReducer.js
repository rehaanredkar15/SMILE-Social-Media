const CurrentChatReducer = ( state, action) => {


    switch(action.type){

          case "CURRENTCHAT_SET":
                
               return {
                  currentchat:action.payload,
               };


          default:
           return state;
    }
}

export default CurrentChatReducer;