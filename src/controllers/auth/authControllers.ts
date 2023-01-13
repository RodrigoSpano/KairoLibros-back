import { Request, Response } from "express";
import AuthApi from "../../api/authApi";
import { LoginData, UserBase } from "../../utilities/interfaces";

const api: AuthApi = new AuthApi();

export const signup = async (req: Request, res: Response) => {
  try {
    if (req.body.repeatPassword !== req.body.password)
      return res.status(400).json({ error: "passwords do not match" });
    const data: UserBase = {
      fullName: `${req.body.firstName} ${req.body.lastName}`,
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
      res.redirect('/')
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