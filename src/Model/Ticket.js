import mongoose from "mongoose";

const ticketSchema = new  mongoose.Schema({
    firma : {
        type : String,
        required : true,
    },
    güzergah : {
        type : String,
        required :true,
    },
    fiyat : {
        type : String,
        required : true,
    },
    tarih : {
        type : Date,
        default : Date.now,
    }
})

const ticketModel = mongoose.model("Ticket", ticketSchema);
export default ticketModel;