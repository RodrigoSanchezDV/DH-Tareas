const {body} = require("express-validator");

const loginValidation = [
    body("email").isEmail().withMessage("Completar campo de email"),
    body("password").notEmpty().withMessage("Completar campo de password").bail().isLength({min:5}).withMessage("Como minimo la contraseña debe tener 6 caracteres")
]

module.exports = loginValidation;