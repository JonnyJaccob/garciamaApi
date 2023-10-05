const schema = {
    login: {
      errorMessage: 'La contraseña debe tener al menos 8 caracteres',
      isLength: {
        options: { min: 8 },
      },
    },
    edad: {
      isInt: true,
    },
    correo: {
      isEmail: true, 
    },
};
module.exports = { schema };