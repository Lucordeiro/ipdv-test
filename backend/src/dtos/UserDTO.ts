export interface ICreateUserDTO {
    name: string;
    email: string;
    password: string;
    job_id: string;
}

export interface IUpdateUserDTO {
  name?: string;
  email?: string;
  password?: string;
  is_active?: boolean;
  job_id?: string;
  user_id?: string;
}

export interface IListUsersByJobDTO {
  job_id: string;
}

export interface IDisableUserDTO {
  user_id: string;
}