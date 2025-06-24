import { PrismaClient } from '../../../generated/prisma/client';

export class BaseRepository<T> {
  protected prisma: PrismaClient;
  protected model: any;

  constructor(prisma: PrismaClient, model: any) {
    this.prisma = prisma;
    this.model = model;
  }

  async findById(uuid: string): Promise<T | null> {
    return this.model.findUnique({ where: { uuid } });
  }

  async findAll(): Promise<T[]> {
    return this.model.findMany();
  }

  async create(data: any): Promise<T> {
    return this.model.create({ data });
  }

  async update(uuid: string, data: any): Promise<T> {
    return this.model.update({ where: { uuid }, data });
  }

  async delete(uuid: string): Promise<T> {
    return this.model.delete({ where: { uuid } });
  }
}