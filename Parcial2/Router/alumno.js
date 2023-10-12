const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.status(200).json({respuesta:"Solicitud - GET"})
})
.post('/',(req,res)=>{
    res.status(200).json({respuesta:"Solicitud - POST"})
})
.delete('/',(req,res)=>{
    res.status(200).json({respuesta:"Solicitud - DELETE"})
})
.put('/',(req,res)=>{
    res.status(200).json({respuesta:"Solicitud - PUT"})
})

module.exports.router = router;