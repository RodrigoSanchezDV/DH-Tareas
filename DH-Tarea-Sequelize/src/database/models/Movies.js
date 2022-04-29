module.exports = (sequelize, Datatypes) => {
    const movies = sequelize.define("Movies",
        {
            id : {
                type : Datatypes.INTEGER,
                primaryKey : true,
                autoIncrement : true
            },
            title : {
                type : Datatypes.STRING
            },
            rating : {
                type : Datatypes.INTEGER
            },
            length : {
                type : Datatypes.INTEGER 
            },
            awards : {
                type : Datatypes.INTEGER
            },
            release_date : {
                type : Datatypes.DATE
            }
        },{
            tableName : "movies",
            timestamps : false
        }
        
    )
return movies
}