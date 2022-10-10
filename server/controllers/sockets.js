const Mensaje = require('../models/mensaje');
const Usuario = require('../models/usuario');

const usuarioConectado = async(uid) =>{

    const usuario = await Usuario.findById(uid);
    usuario.online=true;
    await usuario.save();
    return usuario;
}
const usuarioDesconectado = async(uid) =>{
    const usuario = await Usuario.findById(uid);
    usuario.online=false;
    await usuario.save();
    return usuario;
}

const getUsuarios = async()=>{
    const usuarios = await Usuario.find().sort('-online');

    let arregloUsuarios=[]; 
    usuarios.forEach(function(elemento, indice, array) {
        let user={
            uid:elemento.id,
            nombre:elemento.nombre,
            email:elemento.email,
            online:elemento.online
        };
        arregloUsuarios.push(user);
    })

    
    return arregloUsuarios; 
}

const grabarMensaje =async(payload)=>{
    try{
        const mensaje = new Mensaje(payload);
        await mensaje.save();
        return mensaje; 
    }catch(error){
        console.log(error);
    } 
  
}
module.exports={
    usuarioConectado,
    usuarioDesconectado,
    getUsuarios,
    grabarMensaje
}