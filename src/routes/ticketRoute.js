import express from "express";
import verifyToken_2 from "../middleware/companyMiddleware.js";
import checkCompany from "../middleware/checkCompany.js";
import checkUser from "../middleware/checkUser.js";
import verifyToken from "../middleware/authMiddleware.js";
import{
    createTicket,
    deleteTicket,
    updateTicket,
    buyTicket,
} from "../controllers/ticket.js";

const router = express.Router();

router.post("/created", verifyToken_2, checkCompany, createTicket);
router.patch("/:id", verifyToken_2, checkCompany, updateTicket);
router.delete("/:id", verifyToken_2,checkCompany,deleteTicket);
router.post("/buyticket/:userid/:ticketid", verifyToken, checkUser, buyTicket);



export default router;