import { Router, Request, Response } from 'express';

import { createJobController, updateJobController, listJobsController } from '../modules';

const jobRouter = Router();

jobRouter.get('', (req: Request, res: Response) =>  listJobsController.handle(req, res));
jobRouter.post('', (req: Request, res: Response) =>  createJobController.handle(req, res));
jobRouter.put('/:job_id', (req: Request, res: Response) => updateJobController.handle(req, res));

export { jobRouter }