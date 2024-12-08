import express from "express";

import{
    firmaRegister,
    firmaLogin,
}from "../controllers/firmaAuth.js";

const router = express.Router();

router.post("/firmaregister", firmaRegister);
router.post("/firmalogin", firmaLogin);

export default router;