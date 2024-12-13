import express from "express";
import authRouter from "./authRoute.js";
import firmaAuthRoute from "./firmaAuthRoute.js";
import ticketRouter from "./ticketRoute.js";
import walletRouter from "./walletRoute.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/firmaauth", firmaAuthRoute);
router.use("/ticket", ticketRouter);
router.use("/wallet", walletRouter);

export default router;