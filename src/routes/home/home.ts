import { Request, Response, Router } from "express";
import passport from "passport";

const router = Router()

router.get('/', passport.authenticate('jwt', {session: true, failureRedirect: '/auth/login'}), (req: Request, res: Response) => {return res.json('authorized')})

export default router