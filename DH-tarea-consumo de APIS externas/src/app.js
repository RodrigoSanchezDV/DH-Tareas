const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const app = express();
const fetch = require("node-fetch")

//Ejecuto el llamado a mis rutas
const indexRouter = require('./routes/index');
const moviesRoutes = require('./routes/moviesRoutes');
const genresRoutes = require('./routes/genresRoutes');

//Aquí llamo a la ruta de las api de movies
const apiMoviesRouter = require('./routes/api/movies')
//Aquí llamo a la ruta de las api de actors
const apiGenresRouter = require('./routes/api/genres')
//Aquí llamo a la ruta de las api de actors
const apiActorsRouter = require('./routes/api/actors')


// view engine setup
app.set('views', path.resolve(__dirname, './views'));
app.set('view engine', 'ejs');
app.use(express.json())
app.use(express.static(path.resolve(__dirname, '../public')));

//URL encode  - Para que nos pueda llegar la información desde el formulario al req.body
app.use(express.urlencoded({ extended: false }));

//Aquí estoy disponiendo la posibilidad para utilizar el seteo en los formularios para el usod e los metodos put ó delete
app.use(methodOverride('_method'));

app.use('/', indexRouter);
app.use(moviesRoutes);
app.use(genresRoutes);
//Aquí creo la colección de mis recursos de movies (APIs) http://www.omdbapi.com/?apikey=5baa6750&s=${movie}
app.get("/api", async (req,res)=>{
    const movie = req.query.movie
    const apiKey = "5baa6750"
    const endPoint = `http://www.omdbapi.com/?apikey=5baa6750&s=${movie}`
    const search = await fetch(endPoint).then(data => data.json())
    return res.send(search)
})
app.get("/pronostico", async (req,res)=>{
    const city = req.query.city
    const apiKey = "1967484e540da52bda3698d079ff097c"
    const endPoint = `http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=${apiKey}&q=${city}&units=metric`
    const search = await fetch(endPoint).then(data => data.json())
    return res.send({
        temperatura : search.main.temp + "c°",
        clima : search.weather[0].main,
        descripcion_del_clima: search.weather[0].description,
        ciudad : search.name,
        pais : search.sys.country 
    })
})  
app.use('/api/movies',apiMoviesRouter);
app.use('/api/actors',apiActorsRouter);
app.use('/api/genres',apiGenresRouter);


//Activando el servidor desde express
app.listen('3001', () => console.log('Servidor corriendo en el puerto 3001'));



/*
app.get("/api", async (req,res)=>{
    const movie = req.query.movie
    const apiKey = "6e0d9eb"
    const endPoint = `http://www.omdbapi.com/?apikey=6e0d9eb&s=${movie}`
    const search = await fetch(endPoint).then(data => data.json())
    return res.send(search)
}) 


app.get('/api', async(req,res)=>{
    const apiKey= '5baa6750';
    const peli= req.query.movie;
    const endPoint=`http://www.omdbapi.com/?i=tt3896198&apikey=${apiKey}&s=${peli}`;
    const movies = await fetch(endPoint).then(function(response){return response.json()});
    return res.json(movies);
});
*/
//apiKey "5baa6750" de juan, las mias no andan, no se porque.

//weather key 1967484e540da52bda3698d079ff097c