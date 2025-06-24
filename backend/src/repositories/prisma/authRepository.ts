
import { PrismaClient, Job } from '../../../generated/prisma/client';
import { BaseRepository } from './baseRepository';

export class ProductRepository extends BaseRepository<Job> {
  constructor(prisma: PrismaClient) {
    super(prisma, prisma.job); // Pass the specific Prisma model instance
  }

  // Add model-specific methods if needed
  async findById(product_id: string): Promise<Job | null> {
    return this.model.findUnique({ where: { uuid: product_id } });
  }
}