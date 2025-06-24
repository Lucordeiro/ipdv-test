import { PrismaClient, User } from '../../../generated/prisma/client';
import { BaseRepository } from './baseRepository';

export class UserRepository extends BaseRepository<User> {

  constructor(prisma: PrismaClient) {
    super(prisma, prisma.user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.model.findUnique({ where: { email } });
  }

  async findByJobId(job_id: string): Promise<User | null> {
    return this.model.findMany({
      where: { job_id }, 
    });
  }

  async findAllUsers(): Promise<User[] | null> {
    return this.model.findMany(
      {
        include: {
          job: {
            select:{
              name: true
            }
          }
        }
      }
    );
  }

  async updateUser(uuid: string, data): Promise<User | null> {
    const { name, email, password, job_id } = data
    console.log('job', job_id)
    return this.model.update({ 
      where: { uuid }, 
      data: {
        job: data.job_id ?{
          connect: { uuid: job_id },
        } : undefined,
        name, 
        email, 
        password
    } 
  });
  }

}