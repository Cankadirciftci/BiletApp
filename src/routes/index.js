import express from "express";
import authRouter from "./authRoute.js";
import firmaAuthRoute from "./firmaAuthRoute.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/firmaauth", firmaAuthRoute);


export default router;