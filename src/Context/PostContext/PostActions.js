export const PostStart = (body) => ({

    type:"POSTING_START",
});

export const PostSuccess = (post) => ({

    
    type:"POSTING_SUCCESS",
    payload:post,
});


export const PostFailure = (error) => ({

    type:"POSTING_FAILURE",
    payload:error,
});

export const PostUpdateStart = (body) => ({

    type:"POSTING_UPDATE_START",
});

export const PostUpdateSuccess = (post) => ({

    
    type:"POSTING_UPDATE_SUCCESS",
    payload:post,
});


export const PostUpdateFailure = (error) => ({

    type:"POSTING_UPDATE_FAILURE",
    payload:error,
});