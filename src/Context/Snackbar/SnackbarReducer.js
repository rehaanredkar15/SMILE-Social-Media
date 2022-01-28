const SnackbarReducer = ( state, action) => {


       
    switch(action.type){
                
          case "SNACKBAR_SET":
         

                return {
                  ...state,
                  snackbarOpen:action.payload.snackbarOpen,
                  snackbarType:action.payload.snackbarType,
                  snackbarMessage:action.payload.snackbarMessage
                };
          default:
            return state;
  
    }
}

export default SnackbarReducer;