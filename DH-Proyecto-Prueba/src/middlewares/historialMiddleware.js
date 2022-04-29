const fs = require("fs")
const fecha = require("date-timezones")
let fechaActual = fecha();


function historial (req,res,next){
    fs.appendFileSync("historial.txt", "El usuario ingreso a  " + req.url +"  "+ fechaActual + "                                      ");
    next();
}


module.exports = historial;