import { Router } from "express";

import { userRouter } from './routes/userRoutes';
import { jobRouter } from './routes/jobRoutes';
import { authRouter } from './routes/authRoutes';

const router = Router();

router.use('/api/v1/users', userRouter);
router.use('/api/v1/jobs', jobRouter);
router.use('/api/v1/auth', authRouter);

export { router }