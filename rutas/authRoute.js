import express from 'express';
import {
       registerController, 
       loginController,
       testController,
       forgotPasswordController,
       } from '../controladores/authControllers.js';

import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

//rouer object
const router = express.Router();

//routing
//metodo registrar
router.post('/register', registerController);

//Login
router.post("/login", loginController);

//Forgot Password || POST
router.post("/forgot-password", forgotPasswordController);

//test routes
router.get("/test", requireSignIn, isAdmin, testController);

//protected user route auth
router.get("/user-auth", requireSignIn, (req, res) => {
       res.status(200).send({ ok: true});
});

//protected Admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
       res.status(200).send({ ok: true });
     });

export default router;