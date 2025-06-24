import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { IAuth } from "../entities/IAuth";
import { IUserRepository } from "../repositories/IUserRepository";
import { IAuthenticateUserDTO } from "../dtos/AuthDTO";

export class UserLoginService {
  constructor(private userRepository: IUserRepository) {}

  async execute({ email, password }: IAuthenticateUserDTO) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error("Email or password incorrect");
    }

    if (!user.is_active) {
      throw new Error("User is deactivated");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Email or password incorrect");
    }
    
    const token = jwt.sign(
      {
        uuid: user.uuid,
        email: user.email,
      },
      process.env.JWT_SECRET as string,
      {
        // expiresIn: (process.env.JWT_EXPIRES || "60m"),
        expiresIn: "60m"
      }
    );

    return {
      user: {
        uuid: user.uuid,
        name: user.name,
        email: user.email,
        roleId: user.job_id,
      },
      token,
    };
  }
}

export class UserLogoutService {
  // constructor(private userRepository : IuserRepository){ }
  // constructor(private userRepository : any){ }

  async execute(user: IAuth) {
    // const userData = new Iuser(user);
    // await this.userRepository.createuser(userData);
  }
}
