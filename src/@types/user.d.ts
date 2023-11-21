export type UserType = {
  id: string;
  name: string;
  email: string;
  balance: number;
  roles: string[];
  avatar?: AvatarFullConfig;
};
