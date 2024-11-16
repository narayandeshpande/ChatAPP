import express from 'express'
import { allUsers, login, logout, signup } from '../Controller/User.controller.js'
import secureRoute from '../Middleware/secureRoute.js';
const router=express.Router()
router.post("/signup",signup)
router.post("/login",login);
router.get("/logout",logout)
router.get("/allusers",secureRoute,allUsers)
export default router