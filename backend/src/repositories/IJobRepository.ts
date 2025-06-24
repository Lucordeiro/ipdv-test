import { Job } from '../entities/Job';
import { ICreateJobDTO, IUpdateJobDTO } from '../dtos/JobDTO';

export interface IJobRepository {
    create(job: ICreateJobDTO): Promise<Job>;
    update(jobId: string, job: IUpdateJobDTO): Promise<Job>;
    findAll(): Promise<Job[]>;
}