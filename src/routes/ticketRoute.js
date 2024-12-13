import express from "express";
import verifyToken_2 from "../middleware/companyMiddleware.js";
import checkCompany from "../middleware/checkCompany.js";
import{
    createTicket,
    deleteTicket,
    updateTicket,
} from "../controllers/ticket.js";

const router = express.Router();

router.post("/created", verifyToken_2, checkCompany, createTicket);
router.patch("/:id", verifyToken_2, checkCompany, updateTicket);
router.delete("/:id", verifyToken_2,checkCompany,deleteTicket);


export default router;