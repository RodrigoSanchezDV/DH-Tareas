let userName = prompt("Nombre usuario")

let body = document.querySelector("body")
    let confirm = window.confirm("¿Desea colocar un fondo de pantalla?")
    if(confirm == true){
        body.classList.add("fondo")
    }

let mainIndex = document.querySelector("main");
    mainIndex.style.display = "block" //Funciona aplicandole estilo al main, no entiendo porque.

let h2Index = document.querySelector("h2")
    if(userName == null || userName.length <=0){
        h2Index.innerText = "Invitado"
        h2Index.style.textTransform = "uppercase"
    }else{
        h2Index.innerText = userName
        h2Index.style.textTransform = "uppercase"
    }

let pIndex = document.querySelectorAll("p");
    for (let i = 0; i < pIndex.length; i++){
        if(i % 2 == 0){
            pIndex[i].classList.add("destacadoPar")
        }else{
            pIndex[i].classList.add("destacadoImpar")
        }
    }
let aIndex = document.querySelector("a");
    aIndex.style.color = "#E51B3E"



