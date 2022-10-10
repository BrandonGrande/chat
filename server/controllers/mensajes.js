const Mensaje = require ('../models/mensaje');

const obtenerChat = async (req,res) =>{
    
    const miId=req.uid;
    const mensajesDe = req.params.de;

    const last30 = await Mensaje.find({
        $or:[
            {de:miId,para:mensajesDe},
            {de:mensajesDe,para:miId}
        ]
    }).sort({createdAt:'asc'}).limit(30);  

    listaMensajes = [];

    last30.forEach(mensaje => {
        listaMensajes.push({
            uid:mensaje.id ,
            de:mensaje.de,
            para: mensaje.para,
            mensaje: mensaje.mensaje,
            createdAt: mensaje.createdAt,
            updatedAt: mensaje.updatedAt
        });
    });




    

    res.json({
        ok:true,
        mensajes:listaMensajes

    })

}

module.exports = {
    obtenerChat
}