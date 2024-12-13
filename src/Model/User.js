import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    tickets : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Ticket",
        },
    ],
    walletId: { 
        type: mongoose.Schema.Types.ObjectId,
         ref: "Wallet" 
        },
    
    
});

const userModel = mongoose.model("User", userSchema);
export default userModel;