import { Router } from "express";
import passport from "passport";
import { authentication, changePassword, login, logout, signup } from "../../controllers/auth/authControllers";
import * as authMiddlewares from "../../utilities/middlewares/authMiddlewares";

const router = Router()

router.get('/google', passport.authenticate('google', {session: true, scope: ['profile', 'email']}))
router.get('/google/callback', passport.authenticate('google', {successRedirect: '/', failureRedirect:'/auth/login'}))
router.get('/', passport.authenticate('jwt', {session: true, failureRedirect: '/auth/login'}), authentication)
router.post('/signup', authMiddlewares.registerVerify, signup)
router.post('/login', authMiddlewares.userExists, login)
router.delete('/logout', logout)
router.put('/password', changePassword)



export default router