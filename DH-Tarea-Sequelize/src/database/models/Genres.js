module.exports = (sequelize, Datatypes) => {
    const genre = sequelize.define("Genres",
        {
            id : {
                type : Datatypes.INTEGER,
                primaryKey : true,
                autoIncrement : true
            },
            name : {
                type : Datatypes.STRING
            },
            ranking : {
                type : Datatypes.INTEGER
            },
            active : {
                type : Datatypes.INTEGER 
            }
        },{
            tableName : "genres",
            timestamps : false
        }
        
    )
return genre
}