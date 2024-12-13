import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    eposta :{
        type : String,
        required : true,
    },
    password : {
        type : String,
        required: true,
    },
    firmaName : {
        type : String,
        required : true,
    },
    tickets : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Ticket",
        },
    ],
});

const firma = mongoose.model('firma', companySchema);
export default firma;