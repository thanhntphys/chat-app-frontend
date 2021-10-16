export const userLoggout = () => {
    return {
        type: "USERS_LOGGOUT"
    }
}


function userLoggin(users) {
    return {
        type: "USERS_LOGGIN",
        payload: users
    }
}

export default userLoggin


