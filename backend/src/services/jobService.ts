import { Job } from '../entities/Job';
import { ICreateJobDTO, IUpdateJobDTO } from '../dtos/JobDTO';
import { IJobRepository } from '../repositories/IJobRepository';

export class CreateJobService {
    
    constructor(private jobRepository : IJobRepository){ }
    
    async execute(job: ICreateJobDTO) {
        const { name } = job
        return this.jobRepository.create({
            name
        });
    }
}

export class ListJobsService {
    
    constructor(private jobRepository : IJobRepository){ }
    async execute() {
        return this.jobRepository.findAll();
    }
}

export class UpdateJobService {
    
    constructor(private jobRepository : IJobRepository){ }
    async execute(jobId: string, job: IUpdateJobDTO) {
        const { name } = job
        return this.jobRepository.update(jobId, {
            name
        });
    }
    
}