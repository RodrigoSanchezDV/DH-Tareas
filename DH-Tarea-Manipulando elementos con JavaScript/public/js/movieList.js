let darkMode = prompt("¿Desea modo nocturno?");

let body = document.querySelector("body");
if(darkMode == "ok" || darkMode == "si" || darkMode =="yes"){
    body.style.backgroundColor = "#7f7f7f";
    body.classList.add("fondoMoviesList");
};

let h1 = document.querySelector("h1");
    h1.innerText += "LISTADO DE PELICULAS";
    h1.style.backgroundColor = "white";
    h1.style.color = "teal";
    h1.style.padding = "20px";

let movieList = document.querySelector("ul li a")
    movieList.classList.add("movieList")



