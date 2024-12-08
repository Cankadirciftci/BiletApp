import mongoose from "mongoose";

const firmaSchema = new mongoose.Schema({
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
    yol : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "güzergah",
        },
    ],
});

const firma = mongoose.model('firma', firmaSchema);
export default firma;