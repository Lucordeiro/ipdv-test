import { User } from '../entities/User';
import { ICreateUserDTO, IUpdateUserDTO } from '../dtos/UserDTO';

export interface IUserRepository {
    create(user: ICreateUserDTO): Promise<User | null>;
    update(user_id: string, user: IUpdateUserDTO): Promise<User | null>;
    updateUser(user_id: string, user: IUpdateUserDTO): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    findById(user_id: string): Promise<User | null>;
    findAllUsers(): Promise<User[] | null>;
    findByJobId(job_id: string): Promise<User | null>;
}