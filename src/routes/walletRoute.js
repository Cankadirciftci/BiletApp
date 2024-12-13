import express from "express";
import verifyToken from "../middleware/authMiddleware.js";
import checkUser from "../middleware/checkUser.js"
import {
    updateWallet
}from "../controllers/wallet.js";

const router = express.Router();

router.patch("/:id", verifyToken, checkUser, updateWallet);

export default router;