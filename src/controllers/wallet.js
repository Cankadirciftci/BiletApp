import Wallet from "../Model/Wallet.js";

async function updateWallet(req, res) {
    const userId = req.userId; // Kullanıcı ID'si `req.userId` üzerinden alınıyor.

    try {
        // Kullanıcı ID'sine göre cüzdanı buluyoruz.
        const wallet = await Wallet.findOne({ userId }); 
        console.log(wallet);
        if (!wallet) {
            return res.status(400).json({ message: "Cüzdan bulunamadı." });
        }

        const { balance } = req.body; // Yeni bakiye bilgisi `req.body` ile alınıyor.

        // Cüzdanı güncelliyoruz.
        await Wallet.findByIdAndUpdate(wallet._id, { balance });

        res.status(200).json({ message: "Cüzdan başarıyla güncellendi." });
    } catch (error) {
        res.status(500).json({ message: "Server error.", error: error.message });
    }
}

export { updateWallet };
