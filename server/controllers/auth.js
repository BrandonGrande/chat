const {response} = require('express');
const Usuario = require('../models/usuario'); 
const bcrypt = require('bcryptjs');
const {generarJWT} = require('../helpers/jwt'); 
const usuario = require('../models/usuario');

const crearUsuario = async(req,res = response) =>{
    try {
        const {email,password} = req.body;
        const existeEmail = await Usuario.findOne({email});
    
        //verificar que no exista email
        if (existeEmail){
            return res.status(400).json({
                ok:false,
                msg:"El email ingresado ya existe.\n Favor de validar."
            })
        }

        const usuario = new Usuario(req.body);
        //Encriptar la contraseña 
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password,salt); 

        //Guardar usuario en BD
        await usuario.save();

        //generar JWT
        const token = await generarJWT(usuario.id);

        res.json({
            ok:true,
            email: usuario.email,
            nombre:usuario.nombre,
            id:usuario.id,
            token
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador.'
        });

    }

} 

const login = async(req,res = response)=>{
    const {email,password} = req.body;
    try{
         const usuarioBD = await usuario.findOne({email});
         if (!usuarioBD) {
             return res.status(404).json({
                 ok:false,
                 msg:'Email o password no encontrados'
             });
         }
         const validPassword = bcrypt.compareSync(password, usuarioBD.password)
         if(!validPassword){
             return res.status(400).json({
                 ok:false,
                 msg:'Email o password no encontrados'
             });
         }
        const token = await generarJWT(usuarioBD.id);
        res.json({
            ok:true,
            email: usuarioBD.email,
            nombre:usuarioBD.nombre,
            id:usuarioBD.id,
            token
        }); 
    }catch(error){
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }

}

const renewToken = async(req,res=response)=>{

    const uid = req.uid;
    
    //Generar GWT
    const token = await generarJWT(uid);
    
    //Obtener usuario por uid
    const usuario = await Usuario.findById(uid);

   
    res.json({
        ok:true,
        msg:'renew',
        token:token,
        email: usuario.email,
        nombre:usuario.nombre,
        id:usuario.id
    });
}

module.exports ={
    crearUsuario,
    login,
    renewToken
}
