import { Request, Response } from "express";
import AuthApi from "../../api/authApi";
import { LoginData, UserBase } from "../../utilities/types";

const api: AuthApi = new AuthApi();

export const signup = async (req: Request, res: Response) => {
  try {
    if (req.body.repeatPassword !== req.body.password)
      return res.status(400).json({ error: "passwords do not match" });
    const data: UserBase = {
      username: `${req.body.firstName} ${req.body.lastName}`,
      email: req.body.email,
      phone: `${req.body.phoneArea} ${req.body.phoneNumber}`,
      password: req.body.password,
    };
    const newUser = await api.register(data);
    res.status(200).json({ success: true, user: newUser });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const data: LoginData = req.body;
    const log: any = await api.login(data);
    if (log) {
    res.cookie('Authorization', log.token, {httpOnly: true, secure: process.env.NODE_ENV === 'production'})
      res.redirect('/auth')
			return
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("Authorization");
    req.session.destroy((error) => {
      if (error) return res.status(400).json({ error: error.message });
    });
    res.json({ success: true });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  try {
    const user: Partial<UserBase> = req.user!
    return await api.changePassword(req.user ? user.email! : req.body.email , req.body.newPassword)
  } catch (error) {
    res.status(500).json(error)
  }
}

export const authentication = async (req: Request, res: Response) => {
  res.status(200).json({success: true})
}