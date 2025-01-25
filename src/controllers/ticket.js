import Ticket from "../Model/Ticket.js";
import Company from "../Model/Company.js";
import User from "../Model/User.js";
import Wallet from "../Model/Wallet.js";
import scheduleTicketExpiration from '../utils/schedule.js';
import redis from "../config/env/index.js";


const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return `${day}.${month}.${year} ${hours}:${minutes}`;
};

async function createTicket(req, res) {
    

    const parseDateTime = (dateTimeString) => {
        const [datePart, timePart] = dateTimeString.split(' ');
        const [day, month, year] = datePart.split('.');
        const [hours, minutes] = timePart.split(':');
        return new Date(year, month - 1, day, hours, minutes);
    };

    try {
        const { güzergah, fiyat, adet, isActive, expirationDate } = req.body;

        if (!güzergah || !fiyat || !adet || !isActive || !expirationDate) {
            return res.status(400).json({ error: 'Tüm alanlar gereklidir.' });
        }

        const parsedDateTime = parseDateTime(expirationDate); // Tarihi parse et
        if (isNaN(parsedDateTime.getTime())) {
            return res.status(400).json({ error: 'Geçerli bir tarih ve saat formatı giriniz (DD.MM.YYYY HH:mm).' });
        }

        const ticket = new Ticket({
            firma: req.body.firma || req.firma,
            güzergah,
            fiyat: parseFloat(fiyat),
            adet,
            isActive,
            expirationDate: parsedDateTime, // Date olarak kaydet
        });

        await ticket.save();

        scheduleTicketExpiration(ticket._id, parsedDateTime); // Tarihe göre zamanlayıcı ayarla

        res.status(201).json({
            message: 'Bilet başarıyla oluşturuldu.',
            ticket: {
                ...ticket.toObject(),
                expirationDate: formatDate(ticket.expirationDate), // Formatlı tarih dön
            },
        });
    } catch (error) {
        console.error('Hata:', error);
        res.status(400).json({ message: 'Veri doğrulama hatası. Lütfen tüm alanları kontrol edin.', error });
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
    const adet = req.body.adet;
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
        
        if(ticket.adet >= adet){
            wallet.balance -= ticket.fiyat;
            await wallet.save();
    
            user.tickets.push(ticketId);
            await user.save();
            ticket.adet -= adet;
            await ticket.save();
        }
       
        
        return res.status(200).json({message: "Bilet başarıyla satın alındı." });
    }catch(error){
        res.status(500).json({message : "Server error"});
    }

}   

async function getUserTickets(req, res) {
    const userId = req.params.userid;

    try {
        const cachedTickets = await redis.get(`user:${userId}:tickets`);
        if(cachedTickets){
            return res.status(200).json(JSON.parse(cachedTickets));
        }

        const user = await User.findById(userId).populate('tickets');
        if(!user){
            return res.status(400).json({message : "Kullanıcı bulunamadı."});
        }

        await redis.setex(`user:${userId}:tickets`, 3600, JSON.stringify(user.tickets));
        return res.status(200).json(user.tickets);
    }catch(error){
        console.error("Redis veya veritabanı hatası:", error);
        res.status(500).json({message : "Server error."});
    }
}

export {
    createTicket,
    updateTicket,
    deleteTicket,
    buyTicket,
    getUserTickets,
};