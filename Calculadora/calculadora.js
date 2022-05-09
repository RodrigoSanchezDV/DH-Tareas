console.log("Calculadora enlazada")

let delete1 = document.querySelector("#delete");
let numbers = document.querySelectorAll("#number");
let display = document.querySelector("#display");
let result = document.querySelector("#result");

let sumar = document.querySelector("#sumar");
let restar = document.querySelector("#restar");
let multiplicar = document.querySelector("#multiplicar");
let dividir = document.querySelector("#dividir");
let historial = document.querySelector("#historial")

let resultado = 0;

let show =((e)=>{
    let value = Number(e.srcElement.innerHTML)
    display.innerHTML += "" + value
})

    numbers.forEach(a=>{
        a.addEventListener("click",show)
    })

delete1.addEventListener("click",()=>{
    display.innerHTML ="";
    historial.innerHTML =""
    resultado = 0
})

let resolve = ()=>{
    switch (historial.innerHTML.slice(-1)) {
        case "+":
            hacerSuma()
        break;

        case "-":
            hacerResta()
        break;
        
        case "/":
            hacerDivision()
        break;

        case "x":
            hacerMultiplicacion()
        break;
    }
    historial.innerHTML = historial.innerHTML.slice(0,-1);
    historial.innerHTML = "=" + resultado;
}

result.addEventListener("click",resolve);

let hacerSuma = ()=>{
    resultado = parseInt(resultado,10) + parseInt(display.innerHTML ==""? 0: display.innerHTML,10);

    historial.innerHTML += display.innerHTML + "+";

    display.innerHTML = "";
}

sumar.addEventListener("click",hacerSuma);

let hacerResta = ()=>{
    resultado = parseInt(resultado) - parseInt(display.innerHTML ==""? 0: display.innerHTML,10);

    historial.innerHTML += display.innerHTML + "-"

    display.innerHTML = ""

}

restar.addEventListener("click",hacerResta)

let hacerDivision = ()=>{
    let a = 1;
    if(historial.innerHTML!=""){
        if(historial.innerHTML.charAt(0) == "="){
            a = historial.innerHTML.slice(1)
        }else{
            a = historial.innerHTML
        }
        if(a!=undefined){
            if(a.slice(-1)=="/"){
                a = a.slice(0,-1)
            }
        }
    }
    if(a==1){
        resultado =  parseInt(display.innerHTML ==""? 0: display.innerHTML,10) / a
    }else{
        resultado =  a / parseInt(display.innerHTML ==""? 0: display.innerHTML,10)
    }

    historial.innerHTML += display.innerHTML + "/";

    display.innerHTML = ""
}

dividir.addEventListener("click",hacerDivision)


let hacerMultiplicacion = ()=>{
    let a = 1;
    if(historial.innerHTML!=""){
        if(historial.innerHTML.charAt(0) == "="){
            a = historial.innerHTML.slice(1)
        }else{
            a = historial.innerHTML
        }
        if(a!=undefined){
            if(a.slice(-1)=="x"){
                a = a.slice(0,-1)
            }
        }
    }
    if(a==1){
        resultado =  parseInt(display.innerHTML ==""? 0: display.innerHTML,10) / a
    }else{
        resultado =  a * parseInt(display.innerHTML ==""? 0: display.innerHTML,10)
    }

    historial.innerHTML += display.innerHTML + "x";

    display.innerHTML = ""
}

multiplicar.addEventListener("click",hacerMultiplicacion)