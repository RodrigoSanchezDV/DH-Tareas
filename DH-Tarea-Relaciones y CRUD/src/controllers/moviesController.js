const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");


//Aqui tienen una forma de llamar a cada uno de los modelos
// const {Movies,Genres,Actor} = require('../database/models');

//Aquí tienen otra forma de llamar a los modelos creados
const Movies = db.Movie;
const Genres = db.Genre;
const Actors = db.Actor;


const moviesController = {
    'list': (req, res) => {
        Movies.findAll({include : ["genres"]})
            .then(movies => {
                res.render("moviesList",{movies})
            })
    },
    'detail': (req, res) => {
        db.Movie.findByPk(req.params.id)
            .then(movie => {
                res.render('moviesDetail.ejs', {movie});
            });
    },
    'new': (req, res) => {
        db.Movie.findAll({
            order : [
                ['release_date', 'DESC']
            ],
            limit: 5
        })
            .then(movies => {
                res.render('newestMovies', {movies});
            });
    },
    'recomended': (req, res) => {
        db.Movie.findAll({
            where: {
                rating: {[db.Sequelize.Op.gte] : 8}
            },
            order: [
                ['rating', 'DESC']
            ]
        })
            .then(movies => {
                res.render('recommendedMovies.ejs', {movies});
            });
    },
    //Aqui dispongo las rutas para trabajar con el CRUD
    add: function (req, res) {
        Genres.findAll({})
        .then(genres => {res.render("moviesAdd",{genres})})
    },
    create: function (req,res) {
        Movies.create({
            title : req.body.title,
            rating : req.body.rating,
            awards : req.body.awards,
            release_date : req.body.release_date,
            length : req.body.length,
            genre_id : req.body.genre_id
        })
        .then(()=>{res.redirect("/movies")})
    },
    edit: async function(req,res) {
        try {
            const pelis = await Movies.findByPk(req.params.id);
            const generos  = await Genres.findAll({});
            return res.render("moviesEdit",{
                pelis, generos});
        } catch (err) {
            console.log(err)
        }
    },
    update: async function (req,res) {
        await Movies.update({
            title : req.body.title,
            rating : req.body.rating,
            awards : req.body.awards,
            release_date : req.body.release_date,
            length : req.body.length,
            genre_id : req.body.genre_id
        }, {where : 
            {id : req.params.id}})
        return res.redirect("/movies")
        
    },
    delete: function (req,res) {
        Movies.findByPk(req.params.id)
        .then(Movie => {res.render("moviesDelete",{Movie})})
    },
    destroy: async function (req,res) {
        const productToDelete = await Movies.findByPk(req.params.id, {include : ["actors"]});
        productToDelete.removeActors(productToDelete.actors);
        productToDelete.destroy()
        return (res.redirect("/movies"))
    }
}

module.exports = moviesController;

/*
    edit: async function(req,res) {
        try {
            const pelis = await Movies.findByPk(req.params.id);
            const generos  = await Genres.findAll({});
            return res.render("moviesEdit",{
                pelis, generos});
        } catch (err) {
            console.log(err)
        }
    },
    edit: function(req,res) {
            const generos = Genres.findAll({});
            Movies.findByPk(req.params.id)
            .then(pelis => {res.render("moviesEdit",{pelis, generos})});
        },
*/