window.onload = function(){
    let titulo = document.querySelector('.moviesAddTitulo')
    let formulario = document.querySelector('#formulario');
    let article = document.querySelector('article');
    titulo.innerHTML = 'AGREGAR PELÍCULA';
    titulo.classList.add('titulo');
    article.classList.add('fondoTransparente');
    formulario.classList.add('fondoCRUD');


    let estadoSecreto = 0; 
    let key = ""
    const tituloPelicula = document.querySelector("#titulo");
    
    tituloPelicula.addEventListener("keypress",(e)=>{
        key += e.key
        console.log(key)
        switch(key){
            case "s":
            estadoSecreto += 1
            break;
            case "se":
            estadoSecreto += 1
            break;
            case "sec":
            estadoSecreto ++
            break;
            case "secr":
            estadoSecreto ++
            break;
            case "secre":
            estadoSecreto ++
            break;
            case "secret":
            estadoSecreto ++
            break;
        }
        if(estadoSecreto == 6 && e.key == "o"){
            alert("Easter egg")
            estadoSecreto = 0
        }
        console.log(estadoSecreto)
    })
}