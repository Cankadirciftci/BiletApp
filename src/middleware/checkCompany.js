import Companys from '../Model/Company.js';

const checkCompany = async (req, res, next) => {
    try {
        const companyId = req.companyId;
        const campany = await Companys.findById(companyId);

        if(!campany){
            return res.status(404).json({message: ' not found'});
        }
        req.campany = campany;
        next();
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

export default checkCompany;