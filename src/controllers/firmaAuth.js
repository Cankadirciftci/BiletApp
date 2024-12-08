import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {secret_key_2} from "../config/env/index.js";
import Firma from "../Model/Company.js";

async function firmaRegister(req, res) {
    try{
        const {eposta , password , firmaName, yol} = req.body;
        const existingFirma = await Firma.findOne({eposta});
        if(existingFirma){
            return res.status(400).json({error : "Firma mecvut. "});
        }
        const hashedPassword =await bcrypt.hash(password, 10);
        const firma = new Firma({
            eposta,
            firmaName,
            yol,
            password : hashedPassword,
        });
        await firma.save();
        res.status(201).json({message: "Firma başarıyla oluşturuldu"});
    }catch(error){
        res.status(500).json({error: error.message})
    }  
}

async function firmaLogin(req, res) {
    try {
        const { eposta, password } = req.body;

        if (!eposta || !password) {
            return res.status(400).json({ error: "Geçersiz istek. Eposta ve şifre gerekli." });
        }

        const firma = await Firma.findOne({ eposta });
        if (!firma) {
            return res.status(401).json({ error: "Firma bulunamadı." });
        }

        const passwordMatch = await bcrypt.compare(password, firma.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: "Hatalı şifre, lütfen şifrenizi kontrol ediniz." });
        }

        const firmatokken = jwt.sign({ firmaId: firma._id }, secret_key_2, {
            expiresIn: "365d", // Süre formatını düzelttik.
        });
        res.status(200).json({ accessToken: firmatokken });
    } catch (error) {
        console.error("Giriş sırasında hata:", error);
        res.status(500).json({ error: "Giriş başarısız." });
    }
}

export{firmaLogin,firmaRegister};