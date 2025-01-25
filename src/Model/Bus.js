import mongoose from "mongoose";

const seatSchema = new mongoose.Schema({
  number: Number,
  status: { type: Number, default: 0 },
  userId: { type: mongoose.Schema.Types.ObjectId, default: null }
});

const busSchema = new mongoose.Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'firma',
    required: true
},
  seats: { 
    type: [[mongoose.Schema.Types.Mixed]], 
    required: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now }
});

const Bus = mongoose.model('Bus', busSchema);
  
  export default Bus;