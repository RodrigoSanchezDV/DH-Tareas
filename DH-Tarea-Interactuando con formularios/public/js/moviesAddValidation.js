let createMovieForm = document.querySelector("form");

let titleField = document.querySelector("[name=title]");
let ratingField = document.querySelector("[name=rating]");
let awardsField = document.querySelector("[name=awards]");
let releaseDateField = document.querySelector("[name=release_date]");
let lengthField = document.querySelector("[name=length]");
let genreField = document.querySelector("[name=genre_id]");

validationEmpty = (e) =>{
    let field = e.target;
    let errorMessage = field.nextElementSibling
    if(e.target.value.trim()==""){
        field.classList.remove("verified");
        field.classList.add("danger");
        fieldName = "El campo " + field.name + " es obligatorio"
        errorMessage.innerHTML = fieldName
    }else{
        field.classList.remove("danger");
        field.classList.add("verified")
        fieldName = ""
        errorMessage.innerHTML = fieldName
    }
}
validationAwardsRating = (e) =>{
    let field = e.target;
    let errorMessage = field.nextElementSibling
    if(e.target.value.trim()!=""){
        field.classList.remove("danger");
        field.classList.add("verified")
        fieldName = ""
        errorMessage.innerHTML = fieldName
        
        if(e.target.value >= 0 && e.target.value <=10 ){
            field.classList.remove("danger");
            field.classList.add("verified")
            fieldName = ""
            errorMessage.innerHTML = fieldName
            
        }else{
            field.classList.remove("verified");
            field.classList.add("danger");
            fieldName = "solo entre 0 y 10"
            errorMessage.innerHTML = fieldName
        }
        
    }else{
        field.classList.remove("verified");
        field.classList.add("danger");
        fieldName = "El campo " + field.name + " es obligatorio"
        errorMessage.innerHTML = fieldName
    }
}

validationLength = (e) =>{
    let field = e.target;
    let errorMessage = field.nextElementSibling
    if(e.target.value.trim()!=""){
        field.classList.remove("danger");
        field.classList.add("verified")
        fieldName = ""
        errorMessage.innerHTML = fieldName
        
        if(e.target.value > 60 && e.target.value < 360 ){
            field.classList.remove("danger");
            field.classList.add("verified")
            fieldName = ""
            errorMessage.innerHTML = fieldName
            
        }else{
            field.classList.remove("verified");
            field.classList.add("danger");
            fieldName = "solo entre 60 y 360 minutos"
            errorMessage.innerHTML = fieldName
        }
    }else{
        field.classList.remove("verified");
        field.classList.add("danger");
        fieldName = "El campo " + field.name + " es obligatorio"
        errorMessage.innerHTML = fieldName
    }
}

titleField.addEventListener("blur",validationEmpty);
ratingField.addEventListener("blur",validationAwardsRating);
awardsField.addEventListener("blur",validationAwardsRating);
releaseDateField.addEventListener("blur",validationEmpty);
lengthField.addEventListener("blur",validationLength);
genreField.addEventListener("blur",validationEmpty);

createMovieForm.addEventListener("submit",(e)=>{
    let error = 0
    let formField = [...createMovieForm.elements];
    formField.pop();
    formField.forEach(oneField=>{
        let errorMessage = oneField.nextElementSibling;
        let fieldName = ""
        if(oneField.value.trim() == ""){
            oneField.classList.add("danger");
            fieldName = "El campo " + oneField.name + " es obligatorio"
            errorMessage.innerHTML = fieldName
            error = true
        }else{
            oneField.classList.remove("danger");
            oneField.classList.add("verified")
            fieldName = ""
            console.log(fieldName)
            errorMessage.innerHTML = fieldName
        }
    });
    if(error == true){
        e.preventDefault();
    }
})