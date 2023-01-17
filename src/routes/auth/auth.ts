import { Router } from "express";
import passport from "passport";
import { authentication, login, logout, signup } from "../../controllers/auth/authControllers";
import * as authMiddlewares from "../../utilities/middlewares/authMiddlewares";

const router = Router()

router.get('/', passport.authenticate('jwt', {session: true, failureRedirect: '/auth/login'}), authentication)
router.post('/signup', authMiddlewares.registerVerify, signup)
router.post('/login', authMiddlewares.userExists, login)
router.delete('/logout', logout)

//google try
router.get('/google', passport.authenticate('google', {session: true, failureRedirect:'/auth/login', failureMessage: true}), (req, res) => res.send(200))
router.get('/google/redirect', passport.authenticate('google'),  (req, res) => res.send(200))


export default router