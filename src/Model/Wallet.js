import mongoose from "mongoose";

const walletSchema = new mongoose.Schema({
    userId : { 
        type: mongoose.Schema.Types.ObjectId,
         ref: "User", 
    },
    balance : {
        type : String,
        required : true,
    }
});


const wallet = mongoose.model('Wallet', walletSchema);
export default wallet;