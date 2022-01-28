import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AuthContextProvider } from "./Context/AuthContext";
import { PostContextProvider } from "./Context/PostContext/PostContext";
import { CurrentChatProvider } from "./Context/CurrentChat/CurrentChatContext";
import { OnlineUsersProvider } from "./Context/OnlineUsers/OnlineUsersContext";
import { SnackbarProvider } from "./Context/Snackbar/SnackbarContext";


ReactDOM.render(

            <AuthContextProvider>
            <PostContextProvider>
            <CurrentChatProvider>
            <OnlineUsersProvider>
            <SnackbarProvider>
              <App />
            </SnackbarProvider>
            </OnlineUsersProvider>
            </CurrentChatProvider>
            </PostContextProvider>
            </AuthContextProvider>
              
              ,
              
     document.getElementById('root')
);

