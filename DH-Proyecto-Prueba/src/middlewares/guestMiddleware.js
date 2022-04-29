
function guest (req,res,next){
    if(req.session.dataUser === undefined){
        return res.redirect("/users/login")
    }
next();
}

module.exports = guest;