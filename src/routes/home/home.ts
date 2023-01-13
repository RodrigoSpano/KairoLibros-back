import { Request, Response, Router } from "express";
import passport from "passport";

const router = Router()

router.get('/', passport.authenticate('jwt', {session: true, failureRedirect: '/auth/login', successRedirect: '/'}), (req: Request, res: Response) => {return res.status(200)})

export default router