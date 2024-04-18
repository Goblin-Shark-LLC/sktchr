const loginController = {};

loginController.isLoggedIn = (req, res, next) => {
    // console.log("google auth user ====> ", req.user);
    return (req.user ? next() : res.sendStatus(401));
}



module.exports =  loginController;