import { PrismaClient } from '../generated/prisma/client';
const prisma = new PrismaClient();

//CONTROLLERS
import { CreateUserController, UpdateUserController, ListAllUsersController, ListUsersByJobController, DisableUserController  } from './controllers/userController';
import { CreateJobController, ListJobsController, UpdateJobController } from './controllers/jobController';
import { CreateAuthController, LogoutController} from './controllers/authController'

//SERVICES
import { CreateUserService, UpdateUserService, ListAllUsersService, ListUsersByJobService, DisableUserService } from './services/userService';
import { CreateJobService, ListJobsService, UpdateJobService } from './services/jobService';

//REPOSITORIES
import { UserRepository } from './repositories/prisma/userRepository';
import { JobRepository } from './repositories/prisma/jobRepository';
import { UserLoginService } from './services/authService';

const userRepository = new UserRepository(prisma);
const jobRepository = new JobRepository(prisma);

const createUserService = new CreateUserService(userRepository);
const updateUserService = new UpdateUserService(userRepository);
const listAllUsersService = new ListAllUsersService(userRepository);
const listUsersByJobService = new ListUsersByJobService(userRepository);
const disableUserService = new DisableUserService(userRepository);

const createJobService = new CreateJobService(jobRepository);
const listJobsService = new ListJobsService(jobRepository);
const updateJobService = new UpdateJobService(jobRepository);

const userLoginService = new UserLoginService(userRepository)

const createUserController = new CreateUserController(createUserService);
const updateUserController = new UpdateUserController(updateUserService);
const listAllUsersController = new ListAllUsersController(listAllUsersService);
const listUsersByJobController = new ListUsersByJobController(listUsersByJobService);
const disableUserController = new DisableUserController(disableUserService);

const createJobController = new CreateJobController(createJobService);
const listJobsController = new ListJobsController(listJobsService);
const updateJobController = new UpdateJobController(updateJobService);

const createAuthController = new CreateAuthController(userLoginService);
const logoutController = new LogoutController();

export { 
    createUserController,
    updateUserController,
    listAllUsersController, 
    listUsersByJobController, 
    disableUserController,
    createJobController, 
    updateJobController, 
    listJobsController,
    createAuthController,
    logoutController
}