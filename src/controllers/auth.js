import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { secret_key } from "../config/env/index.js";
import User from "../Model/User.js";
import Wallet from "../Model/Wallet.js"

async function register(req, res) {
    const { fullName, email, password } = req.body;

    try {
        // Kullanıcının zaten var olup olmadığını kontrol et
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Bu email adresiyle kullanıcı zaten kayıtlı." });
        }

        // Şifreyi hash'le
        const hashedPassword = await bcrypt.hash(password, 10);

            // Kullanıcı için cüzdan oluştur
            const wallet = await Wallet.create({
                balance: 0, // Varsayılan bakiye
            });
        // Yeni kullanıcı oluştur
        const newUser = await User.create({
            fullName,
            email,
            password: hashedPassword,
            walletId: wallet._id, 
        });

        wallet.userId = newUser._id;
        await wallet.save();


        res.status(201).json({
            message: "Kullanıcı ve cüzdan başarıyla oluşturuldu.",
            user: {
                id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
            },
            wallet: {
                id: wallet._id,
                balance: wallet.balance,
            },
        });
    } catch (error) {
        res.status(500).json({ message: "Server error.", error: error.message });
    }
}

export { register };


async function login(req, res) {
    try{
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                error:"Geçersin istek, giriş yapmak için hem e-posta hem de şifre sağlayın.",
            });
        }
        const user =await User.findOne({email});

        if(!user){
            return res.status(401).json({
                error: "Kullanıcı bulunamadı, lütfen doğru e-posta adresin girildiğinden emin olun.",
            });
        }
        
        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch){
            return res
            .status(401)
            .json({error: "Hatalı şifre, lütfen şifrenizi kontrol ediniz."});
        }

        const token = jwt.sign({userId: user._id}, secret_key,{
            expiresIn: "365d",
        });
        res.status(200).json({accessToken: token});
    }catch (error){
        res.status(500).json({error: "Giriş başarısız"});
    }
}


export{login};