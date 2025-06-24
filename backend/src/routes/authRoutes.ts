import { Router, Request, Response } from 'express';

import { createAuthController, logoutController } from '../modules';

const authRouter = Router();

authRouter.post('/login', (req: Request, res: Response) =>  { createAuthController.handle(req, res) });
authRouter.get('/logout', (req: Request, res: Response) => { logoutController.handle(req, res) });

export { authRouter }