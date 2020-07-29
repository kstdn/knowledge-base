export type CreateUserDto = {
  username: string;
  email: string;
  emailConfirm: string;
  password: string;
  passwordConfirm: string;
  firstName?: string;
  lastName?: string;
};
