
function userLogged (req, res, next){
        res.locals.isAnUserLogged = false;
    if(req.session.dataUser !== undefined){
        res.locals.isAnUserLogged = true;
    }
    next();
}

module.exports = userLogged