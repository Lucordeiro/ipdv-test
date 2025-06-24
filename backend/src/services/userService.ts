import bcrypt from "bcrypt";
import { ICreateUserDTO, IDisableUserDTO, IListUsersByJobDTO, IUpdateUserDTO } from "../dtos/UserDTO";
import { IUserRepository } from "../repositories/IUserRepository";

export class CreateUserService {
  constructor(private userRepository: IUserRepository) {}

  async execute({ name, email, password, job_id }: ICreateUserDTO) {
    const userExists = await this.userRepository.findByEmail(email);
    if (userExists) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return this.userRepository.create({
      name,
      email,
      password: hashedPassword,
      job_id
    });

  }
}

export class UpdateUserService {
  constructor(private userRepository: IUserRepository) {}

  async execute({ name, email, job_id, user_id }: IUpdateUserDTO) {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new Error('User not found');
    }

    if (email) {
      const existingUser = await this.userRepository.findByEmail(email);
      if (existingUser && existingUser.uuid !== user_id) {
        throw new Error('Email already exists');
      }
    }

    const updatedUser = await this.userRepository.updateUser(user_id, {
      name,
      email,
      job_id,
      user_id
    });

    return updatedUser;
  }
}

export class ListAllUsersService {
  constructor(private userRepository: IUserRepository) {}

  async execute() {
    return this.userRepository.findAllUsers();
  }
}

export class ListUsersByJobService {
  constructor(private userRepository: IUserRepository) {}

  async execute({ job_id }: IListUsersByJobDTO) {
    const users = await this.userRepository.findByJobId(job_id);
    return users;
  }
}

export class DisableUserService {
  constructor(private userRepository: IUserRepository) {}

  async execute({ user_id }: IDisableUserDTO) {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new Error('User not found');
    }

    if (!user.is_active) {
      throw new Error("User already deactivated");
    }
    
    const userDisable = await this.userRepository.update(user_id, {
      is_active: false
    });

    return userDisable;
  }
}
