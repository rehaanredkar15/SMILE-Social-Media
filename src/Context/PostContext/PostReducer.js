const PostReducer = ( state, action) => {

    switch(action.type){

            case "POSTING_START":
               return{
                  post:null,
                  isFetching:true,
                  error:false,
               };
               
            case "POSTING_SUCCESS":
                
               return {
                  post:action.payload,
                  isFetching:false,
                  error:false,
               };

            case "POSTING_FAILURE":
               return {
                  postDetails:null,
                  isFetching:true,
                  error:action.payload,
               };
            case "POSTING_UPDATE_START":
               return{
                  post:null,
                  isFetching:true,
                  error:false,
               };
               
            case "POSTING_UPDATE_SUCCESS":
                
               return {
                  post:action.payload,
                  isFetching:false,
                  error:false,
               };

            case "POSTING_UPDATE_FAILURE":
               return {
                  postDetails:null,
                  isFetching:true,
                  error:action.payload,
               };
          default:
           return state;
    }
}

export default PostReducer;