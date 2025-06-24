
import { PrismaClient, Job } from '../../../generated/prisma/client';
import { BaseRepository } from './baseRepository';

export class JobRepository extends BaseRepository<Job> {
  constructor(prisma: PrismaClient) {
    super(prisma, prisma.job);
  }
}