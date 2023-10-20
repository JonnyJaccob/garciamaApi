import {Router} from 'express'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

const authRouter = Router();
const SECRET_KEY = process.env.SECRET_KEY;

authRouter
    .use('/priv',verifyToken)
    .get('/',(req,res)=>{
        res.json({message: "Ruta desprotegida"})
    })
    .post('/login',(req,res)=>{
        try{
            const {user, pass} = req.body;
            console.log('User ' + user + ' is trying to login.')
            console.log('_______________________')
            if(user == 'admin' && pass == 'admin'){
                
                return res.status(201).json({
                    token: jwt.sign({user:'admin'},SECRET_KEY)
                })
            }else{
                return res.status(400).json({message: "User o password no es valida"})
            }
        }catch(err){
            return res.json({error: err})
        }
        
    })
    .get('/priv/rutaprivada',(req,res)=>{
        res.status(200).json({message: 'ruta Protegida'})
    })

async function verifyToken(req,res,next){
    
    if(!req.headers.authorization ){
        return res.status(401).json('No te estan mandando token / Acceso no authorizado')
    }else{
        //bearer xjjlfjx
        console.log("Clave secreta: " + SECRET_KEY)
        console.log(req.headers.authorization)
        const token = req.headers.authorization.split(' ')[1]
        console.log('_______________________')
        //token
        console.log(token)
        console.log('_______________________') 
        try{
            jwt.verify(token,SECRET_KEY,(err)=>{
                if(err) {
                    return res.status(400).json({error: 'Token invalido'})
                }else{
                    next()
                }
            })
        }catch(err){
            console.log(err)
        }
    }
}

export default authRouter;