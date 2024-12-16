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
    adet : {
        type : Number,
        required : true,
    },
    isActive : {
        type : Boolean,
        required : true,
    },
    expirationDate : {
        type : Date,
        required : true,
    },
    cretedAt: {
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