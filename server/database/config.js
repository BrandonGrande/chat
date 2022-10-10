const mongoose = require('mongoose');

const dbConnection = ()=>{

    try{
        mongoose.connect(process.env.DB_CNN_STRING_V2);
        console.log('DB online');


    }catch(error){
        console.log(error);
        throw new Error('Error en la base de datos');
    }
}


module.exports={
    dbConnection
}