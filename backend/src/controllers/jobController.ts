import { Request, Response } from "express";
import {
  CreateJobService,
  ListJobsService,
  UpdateJobService,
} from "../services/jobService";

export class CreateJobController {
  constructor(private createJobService: CreateJobService) {}
  async handle(req: Request, res: Response): Promise<any> {
    const { name } = req.body;
    try {
      const newJob = await this.createJobService.execute({
        name,
      });
      return res.status(201).json(newJob);
    } catch (err: any) {
      return res
        .status(500)
        .json({ message: err.message || "Unexpected error." });
    }
  }
}

export class ListJobsController {
  constructor(private listJobService: ListJobsService) {}
  async handle(req: Request, res: Response): Promise<any> {
    try {
      const jobs = await this.listJobService.execute();
      return res.status(200).json(jobs);
    } catch (err: any) {
      return res
        .status(500)
        .json({ message: err.message || "Unexpected error." });
    }
  }
}

export class UpdateJobController {
  constructor(private updateJobService: UpdateJobService) {}
  async handle(req: Request, res: Response): Promise<any> {
    const { job_id } = req.params
    const { name } = req.body;
    try {
      const job = await this.updateJobService.execute(job_id, {
        name
      });

      return res.status(200).json(job);
    } catch (err: any) {
      return res
        .status(500)
        .json({ message: err.message || "Unexpected error." });
    }
  }
}
