const userIsAdmin = (loggedInUser = null) => {
    return loggedInUser?.user?.email?.endsWith('@v3.admin');
}

export default userIsAdmin;