import Bus from "../Model/Bus.js";
import User from "../Model/User.js";
import Company from "../Model/Company.js";
import ticket from "../Model/Ticket.js";
import Wallet from "../Model/Wallet.js";

async function createBus(req, res) {
    
    try {
      const companyId = req.params.companyId;

        // Firma kontrolü
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({ message: 'Firma bulunamadı' });
        }

        const seats = [
            // 1. sıra
            [
              { number: 1, status: 0, userId: null }, 
              [
                { number: 2, status: 0, userId: null }, 
                { number: 3, status: 0, userId: null }
              ]
            ],
            // 2. sıra
            [
              { number: 4, status: 0, userId: null }, 
              [
                { number: 5, status: 0, userId: null }, 
                { number: 6, status: 0, userId: null }
              ]
            ],
            // 3. sıra
            [
              { number: 7, status: 0, userId: null }, 
              [
                { number: 8, status: 0, userId: null }, 
                { number: 9, status: 0, userId: null }
              ]
            ],
            // 4. sıra
            [
              { number: 10, status: 0, userId: null }, 
              [
                { number: 11, status: 0, userId: null }, 
                { number: 12, status: 0, userId: null }
              ]
            ],
            // 5. sıra
            [
              { number: 13, status: 0, userId: null }, 
              [
                { number: 14, status: 0, userId: null }, 
                { number: 15, status: 0, userId: null }
              ]
            ],
            // 6. sıra
            [
              { number: 16, status: 0, userId: null }, 
              [
                { number: 17, status: 0, userId: null }, 
                { number: 18, status: 0, userId: null }
              ]
            ],
            // 7. sıra
            [
              { number: 19, status: 0, userId: null }, 
              [
                { number: 20, status: 0, userId: null }, 
                { number: 21, status: 0, userId: null }
              ]
            ],
            // 8. sıra (tekli koltuk)
            [
              { number: 22, status: 0, userId: null }
            ],
            // 9. sıra
            [
              { number: 23, status: 0, userId: null }, 
              [
                { number: 24, status: 0, userId: null }, 
                { number: 25, status: 0, userId: null }
              ]
            ],
            // 10. sıra
            [
              { number: 26, status: 0, userId: null }, 
              [
                { number: 27, status: 0, userId: null }, 
                { number: 28, status: 0, userId: null }
              ]
            ],
            // 11. sıra
            [
              { number: 29, status: 0, userId: null }, 
              [
                { number: 30, status: 0, userId: null }, 
                { number: 31, status: 0, userId: null }
              ]
            ],
            // 12. sıra
            [
              { number: 32, status: 0, userId: null }, 
              [
                { number: 33, status: 0, userId: null }, 
                { number: 34, status: 0, userId: null }
              ]
            ],
            // 13. sıra
            [
              { number: 35, status: 0, userId: null }, 
              [
                { number: 36, status: 0, userId: null }, 
                { number: 37, status: 0, userId: null }
              ]
            ],
            // 14. sıra (son sıra)
            [
              { number: 38, status: 0, userId: null }, 
              { number: 39, status: 0, userId: null }, 
              { number: 40, status: 0, userId: null }, 
              { number: 41, status: 0, userId: null }
            ]
          ];
    
          const bus = new Bus({
            company: companyId,
            seats: seats
        });

        // Otobüsü kaydet
        const savedBus = await bus.save();

        // Firmaya otobüsü ekle
        company.bus.push(savedBus._id);
        await company.save();

        res.status(201).json({ 
            message: 'Otobüs oluşturuldu ve firmaya eklendi', 
            bus: savedBus 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getBus(req, res) {
  try {
    const company = await Company.findById(req.params.companyId)
        .populate('bus');
    
    if (!company) {
        return res.status(401).json({ message: 'Firma bulunamadı' });
    }

    res.json(company.bus);
} catch (error) {
    res.status(500).json({ error: error.message });
}

}

async function getBusId(req, res) {
  try {
    const bus = await Bus.findById(req.params.busId)
        .populate('company', 'firmaName'); // Sadece firma adını getir
        console.log(bus);
    
    if (!bus) {
        return res.status(401).json({ message: 'Otobüs bulunamadı' });
    }

    res.json(bus);
} catch (error) {
    res.status(500).json({ error: error.message });
}
}

async function buyTicket(req, res) {
  try {
    const userId = req.params.userid;
    const busId = req.params.busid;
      const { seatNumber } = req.body;
      if (!seatNumber) {
          return res.status(400).json({ message: 'Koltuk numarası gereklidir' });
      }

      const bus = await Bus.findById(busId);
      if (!bus) {
          return res.status(404).json({ message: 'Otobüs bulunamadı' });
      }

      // Flatten and map seats
      const flatSeats = bus.seats.flat(Infinity); // Tüm alt seviyeleri düzleştirir
      const seat = flatSeats.find((s) => s.number === seatNumber);
  
      if (!seat) {
          return res.status(404).json({ message: 'Geçersiz koltuk numarası' });
      }

      if (seat.status !== 0) {
          return res.status(400).json({ message: 'Koltuk zaten dolu' });
      }

      seat.status = 1;
      seat.userId = userId;
      bus.markModified('seats'); // Bu satırı ekle
      await bus.save();

      res.status(200).json({ 
          message: 'Bilet başarıyla satın alındı', 
          seatNumber 
      });
console.log(flatSeats);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
}


export {
    createBus,
    getBus,
    getBusId,
    buyTicket
};