const db = require('../database/models');

const moviesController = {
    list : (req, res) => {
        db.Movies.findAll()
        .then( movies => {res.render("moviesList.ejs",{movies})})
    },


    detail : (req,res) => {
        db.Movies.findByPk(req.params.id)
        .then(movie =>{res.render("moviesDetail.ejs",{movie})})
    },


    new : (req,res ) => {
        db.Movies.findAll({
            order : [
                ["release_date", "DESC"]
            ]
        })
        .then(movies => {res.render("newestMovies.ejs", {movies})})
    },


    recomended : (req,res ) => {
        db.Movies.findAll({
            where : {
                rating : {[db.Sequelize.Op.gte]: 9}
            },
            order:[
                ["rating","DESC"]
            ],
            limit : 5
        })
        .then(movies => {res.render("recommendedMovies.ejs",{movies})})
    }
}

module.exports = moviesController;