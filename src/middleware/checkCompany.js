import Companys from '../Model/Company.js';

const checkCompany = async (req, res, next) => {
    try {
      
        const firmaId = req.firmaId;
     
        const company = await Companys.findById(firmaId);

        if(!company){
            return res.status(404).json({message: ' not found'});
        }
        req.firma = company;
        next();
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

export default checkCompany;