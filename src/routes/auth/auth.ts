import { Router } from "express";
import passport from "passport";
import { authentication, login, logout, signup } from "../../controllers/auth/authControllers";
import * as authMiddlewares from "../../utilities/middlewares/authMiddlewares";

const router = Router()

router.get('/', passport.authenticate('jwt', {session: true, failureRedirect: '/auth/login'}), authentication)
router.post('/signup', authMiddlewares.registerVerify, signup)
router.post('/login', authMiddlewares.userExists, login)
router.delete('/logout', logout)

//google
router.get('/google', passport.authenticate('google', {session: true, scope: ['profile', 'email']}))
router.get('/google/callback', passport.authenticate('google', {successRedirect: '/success', failureRedirect:'/auth/login'}))


export default router