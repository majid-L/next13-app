const userIsAdmin = ({user}) => {
    return user.email.endsWith('@v3.admin');
}

export default userIsAdmin;