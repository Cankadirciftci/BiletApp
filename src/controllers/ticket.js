import Ticket from "../Model/Ticket.js";
import Company from "../Model/Company.js";
import User from "../Model/User.js";
import Wallet from "../Model/Wallet.js";

async function createTicket(req, res) {
    const firma = req.firma;
    try{
        const ticket = new Ticket(req.body);
        await ticket.save();

        firma.tickets.push(ticket);
        await firma.save();
        res.status(200).json({
            message : "Bilet başarıyla oluşturuldu"
        });
    }catch (error) {
        res.status(500).json({message : "Server error"});
    }   
}

async function updateTicket(req, res) {
    const ticketId = req.params.id;
    const ticket = Ticket.findById(ticketId);
    if(!ticket){
        return res.status(400).json({message : "Bilet bulunamadı."});
    }
    const {fiyat} = req.body;
    try{
        await Ticket.findByIdAndUpdate(ticketId ,{
            fiyat,
            updatedAt: Date.now(),
        });
        res.status(200).json({message : "Bilet güncellendi."});
    }catch(error){
        res.status(500).json({message : "Server error"});
    }
}

async function deleteTicket(req, res) {
    const ticketId = req.params.id;
    try{
        const ticket = await Ticket.findById(ticketId);
        if(!ticket){
            return res.status(400).json({message : "Bilet bulunamadı"});
        }else {
            await Ticket.findByIdAndDelete(ticketId);
            res.status(200).json({message : " Bilet silindi."});
        }
    }catch(error){
        res.status(500).json({message : "Server error"});
    }
    
}

async function buyTicket(req, res) {

    const userId = req.params.userid;
    const ticketId = req.params.ticketid;

    try {
        const user = await User.findById(userId);
        if (!user){
            return res.status(400).json({message : "Kullanıcı bulunamadı."});
        }
        const ticket = await Ticket.findById(ticketId);
        if(!ticket){
            return res.status(400).json({message : "Bilet bulunamadı."});
        }
        const wallet = await Wallet.findOne({ userId });
        if (!wallet) {
            return res.status(400).json({ message: "Cüzdan bulunamadı." });
        }
        if (wallet.balance < ticket.fiyat){
            return res.status(400).json({message : "Bakiye yetersiz."})
        }
        wallet.balance -= ticket.fiyat;
        await wallet.save();

        user.tickets.push(ticketId);
        await user.save();
        
        return res.status(200).json({message: "Bilet başarıyla satın alındı." });
    }catch(error){
        res.status(500).json({message : "Server error"});
    }

}   


export {
    createTicket,
    updateTicket,
    deleteTicket,
    buyTicket,
};