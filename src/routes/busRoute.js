import express from "express";
import verifyToken_2 from "../middleware/companyMiddleware.js";
import checkCompany from "../middleware/checkCompany.js";
import checkUser from "../middleware/checkUser.js";
import verifyToken from "../middleware/authMiddleware.js";
import {
    createBus,
    getBus,
    getBusId,
    buyTicket,
} from "../controllers/bus.js";


const router = express.Router();

router.post("/create/:companyId",verifyToken_2,checkCompany,createBus);
router.get("/:companyId/buses",verifyToken_2,checkCompany,getBus);
router.get("/:busId",verifyToken_2,checkCompany,getBusId);
router.post("/:userid/:busid" ,verifyToken,checkUser,buyTicket);

export default router;
