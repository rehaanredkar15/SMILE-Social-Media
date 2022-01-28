const OnlineUsersReducer = ( state, action) => {


    switch(action.type){

          case "ONLINEUSERS_SET":

                
               return {
                  OnlineUsers:action.payload,
               };


          default:
           return state;
    }
}

export default OnlineUsersReducer;