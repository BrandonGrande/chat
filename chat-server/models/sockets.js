const {comprobarJWT} = require('../helpers/jwt');
const {usuarioConectado,usuarioDesconectado,getUsuarios, grabarMensaje} = require('../controllers/sockets'); 
class Sockets {

    constructor( io ) {

        this.io = io;

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', async( socket ) => {


            const [valido,uid]= comprobarJWT(socket.handshake.query['x-token']);
            
            if (!valido){
                console.log('socket no identificado');
                return socket.disconnect();
            }

            await usuarioConectado(uid);

            //Unir al usuario a una sala 

            socket.join(uid); 

            //Emitir todos los usuarios conectados 
            this.io.emit('lista-usuarios',await getUsuarios());

            socket.on('mensaje-personal',async(payload)=>{
                const mensaje = await grabarMensaje(payload);
                this.io.to(payload.para).emit('mensaje-personal',{
                    uid:mensaje._id,
                    mensaje:mensaje.mensaje,
                    createdAt:mensaje.createdAt,
                    updatedAt:mensaje.updatedAt,
                    de:mensaje.de,
                    para:mensaje.para,

                });

                this.io.to(payload.de).emit('mensaje-personal',{
                    uid:mensaje._id,
                    mensaje:mensaje.mensaje,
                    createdAt:mensaje.createdAt,
                    updatedAt:mensaje.updatedAt,
                    de:mensaje.de,
                    para:mensaje.para,

                });
                

            });
        
            socket.on('disconnect',async()=>{
                
                await usuarioDesconectado(uid);
                this.io.emit('lista-usuarios',await getUsuarios());
            });


        });
    }


}


module.exports = Sockets;