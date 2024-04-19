const loginController = {};

loginController.isLoggedIn = (req, res, next) => {
    // console.log("google auth user ====> ", req.user);
    try{
        if(req.user){
            res.cookie('isLoggedIn', true);
        }
        else {
            res.cookie('isLoggedIn', false);
        }
        return next();
    } catch (error) {
        if(error){
            return next({
                message: "An error occurred in isLoggedIn middleware.",
                status: 500,
                error: error
            })
        }
    }
    }

loginController.logOut = (req, res, next) => {
    req.logout(function(err) {
        if (err) { return next({
            message: 'An error occurred during logout process.',
            error: err
            });
        }
    })
    return next();
};

module.exports =  loginController;