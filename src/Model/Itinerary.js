import mongoose from "mongoose";

const güzergahSchema = new mongoose.Schema({
    route :{
        type : String,
        required : false,
    },
    price : {
        type : String,
        required : false,
    }
});

const güzergah = mongoose.model('güzergah', güzergahSchema);
export default güzergah;