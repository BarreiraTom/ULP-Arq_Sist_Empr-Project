const mongoose= require('mongoose');
const Schema= mongoose.Schema;

const encomendaSchema= new Schema({
    Name:{
        type: String,
        require: true
    },
    Nome:{
        type: String,
        require: true
    },
    NIF:{
        type: String,
        require: true
    },
    Entidade:{
        type: String,
        require: true
    },
    Total:{
        type: String,
        require: true
    },
    Data:{
        type: String,
        require: true
    }
});

module.exports= mongoose.model("Encomendas", encomendaSchema)