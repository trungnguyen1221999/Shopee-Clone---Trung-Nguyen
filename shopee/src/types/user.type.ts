
type RolesType = "User" | "Admin";

export interface User {
  access_token: string;
  expires: string;
  user: {
    _id: string;
    roles: RolesType[];
    email: string;
    name: string;
    date_of_birth: null;
    address: string;
    phone: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}
