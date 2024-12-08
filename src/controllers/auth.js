import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { secret_key } from "../config/env/index.js";
import Users from "../Model/User.js";

async function register(req, res) {
    try{
        const{ fullName, email, password } = req.body;
        
        const existingUser = await Users.findOne({email});
        if (existingUser){
            return res.status(400).json({ error: "Kullanıcı zaten mevcut"});
        }
        
        const user = new Users({
            fullName,
            email,
            password,
            password: hashedPassword,
        });
        await user.save();
        res.status(201).json({ message: "Kullanıcı başarıyla oluşturuldu"});
    }catch(error){
        res.status(500).json({error: error.message});
    }
    
}

async function login(req, res) {
    try{
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                error:"Geçersin istek, giriş yapmak için hem e-posta hem de şifre sağlayın.",
            });
        }
        const user =await Users.findOne({email});

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


export{register, login};