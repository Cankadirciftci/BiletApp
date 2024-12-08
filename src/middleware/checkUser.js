import Users from '../Model/User.js';

const checkUser = async (req, res, next) => {
    try {
        const userId = req.userId;
        const user = await Users.findById(userId);

        if(!user){
            return res.status(404).json({message: 'User not found'});
        }
        req.user = user;
        next();
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

export default checkUser;