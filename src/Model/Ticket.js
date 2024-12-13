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
        type : Number,
        required : true,
    },
    tarih : {
        type : Date,
        default : Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

const ticket = mongoose.model("Ticket", ticketSchema);
export default ticket;