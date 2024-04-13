const loginController = {};

loginController.isLoggedIn = (req, res, next) => {
    req.user ? next() : res.sendStatus(401);
}

module.exports =  loginController;