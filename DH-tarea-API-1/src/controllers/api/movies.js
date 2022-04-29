const {Movie} = require('../../database/models');

module.exports = {
    list : (req,res) => {
        Movie.findAll({include : ["genre"]})
        .then(movie => res.json({
            meta: {
                url: "/api/movies",
                total : movie.length,
                status: 200
            },
            data: movie
            
        }))
    },
    create :async (req,res) => {
        console.log(req.body)
        const newMovie = await Movie.create(req.body)
        return res.json(newMovie)
    },
    delete : (req,res) => {
        Movie.destroy({where : {id : req.params.id}})
        .then(movie => res.json(movie))
    }
}