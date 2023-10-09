const joi = require('joi');

module.exports = {
    registroEsquema: joi.object({
        usuario: joi.string()
    .alphanum()
    .min(3)
    .max(24)
    .required(),

    password: joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .required(),

    repeat_password: joi.ref('password'),

    birth_year: joi.number()
        .integer()
        .min(1900)
        .max(2013),

    email: joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),
    }),
} 