const userIsAdmin = (loggedInUser: Auth | { user: { email: string }}) => {
    return loggedInUser.user?.email?.endsWith('@v3.admin');
}

export default userIsAdmin;