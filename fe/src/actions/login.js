export const loginTask = (loginId) => ({
    type:'LOGIN',
    payload:{
        loginId
    }
});

export const logoutTask = (loginId) => ({
    type:'LOGOUT',
    payload:{
        loginId
    }
});