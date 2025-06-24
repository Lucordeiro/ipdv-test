import { Request, Response } from "express";
const jwt = require("jsonwebtoken");
import messages from "./../contants/messages";
import { UserLoginService } from "../services/authService";

export class CreateAuthController {
  constructor(private userLoginService: UserLoginService) {}
  async handle(req: Request, res: Response): Promise<Response> {
    const { login_failed } = messages;
    try {
      const { email, password } = req.body;
      const authenticateUser = await this.userLoginService.execute({
        email,
        password,
      });

      return res.status(200).json(authenticateUser);
    } catch (err) {
      return res.status(401).json({ error: login_failed });
    }
  }
}

export class LogoutController {
  async handle(request: Request, response: Response): Promise<Response> {
    console.log("LOGOUT!!");
    return response.json({})
  }
}
