import { Router, Request, Response } from 'express';

import { createUserController, updateUserController, listAllUsersController, listUsersByJobController, disableUserController } from '../modules';

const userRouter = Router();

userRouter.post('/', (req: Request, res: Response) =>  { createUserController.handle(req, res) });
userRouter.get('/', (req: Request, res: Response) =>  { listAllUsersController.handle(req, res) });
userRouter.put('/:user_id', (req: Request, res: Response) => { updateUserController.handle(req, res)});
userRouter.get('/listByJob/:job_id', (req: Request, res: Response) => { listUsersByJobController.handle(req, res) });
userRouter.patch('/:user_id', (req: Request, res: Response) => { disableUserController.handle(req, res)});

export { userRouter }