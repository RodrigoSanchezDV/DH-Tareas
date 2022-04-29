function auth (req,res,next){
    if(req.session.dataUser !== undefined){
        return res.redirect("/users/profile")
    }
next();
}

module.exports = auth;