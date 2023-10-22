import {Router} from 'express'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import mysql from 'mysql2/promise'

dotenv.config()

const authRouter = Router();
const SECRET_KEY = process.env.SECRET_KEY;
let idActual = 0;
let listaID = [1,2]

authRouter
    .use('/priv',verifyToken) 
    .get('/prueba', async (req, res) => {
        try {
          await listaBD(); 
          console.log(listaID); 
          const id = await DevolverId("admin", "admin");
          console.log("ID: " + id); 
          return res.json({ message: "Prueba finalizada" });
        } catch (error) {
          console.error('Error:', error);
          return res.status(500).json({ error: 'Ocurrió un error en la prueba' });
        }
    })
    .get('/',(req,res)=>{
        res.json({message: "Ruta desprotegida"})
    })
    .post('/login',async (req,res)=>{
        try{
            const {user, pass} = req.body;
            await listaBD()
            idActual = await DevolverId(user, pass)
            if(idActual != 0){
                console.log('Usuario.- ' + user + ' is trying to login.')
                if (listaID.includes(idActual)){
                    console.log('_______________________\nVerificacion exitosa')
                    return res.status(201).json({
                        message:"Verificacion exitosa",
                        token: jwt.sign({user: user}, SECRET_KEY)
                    })
                }else{
                    console.log("Cuenta incorrecta -- User o password no es valida")
                    return res.status(400).json({ error: "Cuenta incorrecta -- User o password no es valida" });
                }
            }else{
                return res.status(400).json({ error: "La cuenta es invalida " });
            }
        }catch(err){
            return res.status(400).json({error: err})
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
const dataDeBase ={
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
}
async function listaBD(){
    //Metodo para filtar que cuentas tienen permisos para ser verificados
    //por el momento todas
    listaID = []
    const conexion = await mysql.createConnection(dataDeBase);
    try {
        const [rows, fields] = await conexion.execute('SELECT id FROM ejemplo.cuenta');
        const ids = rows.map((row) => row.id);
        listaID = listaID.concat(ids);
    } catch (error) {
        console.error('Error al obtener datos de la base de datos:', error);
    } finally {
        await conexion.end();
    }
}
async function DevolverId(User,Pass){
    const conexion = await mysql.createConnection(dataDeBase);
    try {
        const [rows] = await conexion.execute('SELECT id FROM cuenta WHERE usuario = ? AND password = ?', [User, Pass]);
        if (rows.length === 0) {
            return 0;
        }
        return rows[0].id;
    }catch(err){
        throw new Error(err);
    }finally{
        await conexion.end();
    }
}

export default authRouter;