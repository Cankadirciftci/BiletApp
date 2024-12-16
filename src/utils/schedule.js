import schedule from 'node-schedule';
import Ticket from '../Model/Ticket.js';

const scheduleTicketExpiration = (ticketId, expirationDate) => {
    schedule.scheduleJob(expirationDate, async () => {
        try {
            await Ticket.findByIdAndUpdate(ticketId, { isActive: false });
            console.log(`Bilet ${ticketId} artık aktif değil.`);
        } catch (error) {
            console.error('Zamanlayıcı hatası:', error);
        }
    });
};

export default scheduleTicketExpiration;
