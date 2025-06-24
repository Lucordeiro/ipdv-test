import { Request, Response } from "express";
import {
  CreateUserService,
  UpdateUserService,
  ListUsersByJobService,
  DisableUserService,
  ListAllUsersService
} from "./../services/userService";

export class CreateUserController {
  constructor(private createUserService: CreateUserService) {}
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, email, password, job_id } = req.body;
    try {
      const newUser = await this.createUserService.execute({
        name,
        email,
        password,
        job_id
      });

      return res.status(201).json(newUser);
    } catch (err: any) {
      return res
        .status(500)
        .json({ message: err.message || "Unexpected error." });
    }
  }
}

export class UpdateUserController {
  constructor(private updateUserService: UpdateUserService) {}
  async handle(req: Request, res: Response): Promise<Response> {
    const { user_id } = req.params
    const { name, email, password, job_id } = req.body;
    try {
      const user = await this.updateUserService.execute({
        name,
        email,
        password,
        job_id,
        user_id
      });

      return res.status(200).json(user);
    } catch (err: any) {
      return res
        .status(500)
        .json({ message: err.message || "Unexpected error." });
    }
  }
}

export class ListUsersByJobController {
  constructor(private listUsersByJobService: ListUsersByJobService) {}
  async handle(req: Request, res: Response): Promise<Response> {
    const { job_id } = req.params;
    try {
      const users = await this.listUsersByJobService.execute({
        job_id
      });

      return res.status(200).json(users);
    } catch (err: any) {
      return res
        .status(500)
        .json({ message: err.message || "Unexpected error." });
    }
  }
}

export class ListAllUsersController {
  constructor(private listAllUsersService: ListAllUsersService) {}
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const users = await this.listAllUsersService.execute();

      return res.status(200).json(users);
    } catch (err: any) {
      return res
        .status(500)
        .json({ message: err.message || "Unexpected error." });
    }
  }
}

export class DisableUserController {
  constructor(private disableUserService: DisableUserService) {}
  async handle(req: Request, res: Response): Promise<Response> {
    const { user_id } = req.params;
    try {
      const user = await this.disableUserService.execute({
        user_id
      });

      return res.status(200).json(user);
    } catch (err: any) {
      return res
        .status(500)
        .json({ message: err.message || "Unexpected error." });
    }
  }
}
