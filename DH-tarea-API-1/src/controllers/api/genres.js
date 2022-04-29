const {Genre} = require('../../database/models');

module.exports = {
    list : (req,res) => {
        Genre.findAll()
        .then(genres => res.json({
            meta: {
                url: "/api/genres",
                total : genres.length,
                status: 200
            },
            data: genres
            
        }))
    }
}