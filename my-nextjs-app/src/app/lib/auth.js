const customAuthorizationLogic = async (token, user) => {
    // custom authorization logic

    const authorization = {
        url: "https://accounts.spotify.com/authorize",
        params: { 
            scope: 'user-read-private playlist-read-private playlist-modify-private playlist-modify-public',
        },
    };

    // ensure to return the updated token
    //return Promise.resolve(token);

    console.log('Authorization URL:', authorization.url);
    
    // ensure to return the authorization object
    return authorization; 
};

export { customAuthorizationLogic };