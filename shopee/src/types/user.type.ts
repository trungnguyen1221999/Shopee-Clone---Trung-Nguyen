const UserEx = {
  access_token:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOThmNWI1MTY5MDU1MzZlODE4ZjhjYyIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciIsIkFkbWluIl0sImNyZWF0ZWRfYXQiOiIyMDIxLTA2LTE0VDA4OjA4OjI4LjQ5NVoiLCJpYXQiOjE2MjM2NTgxMDgsImV4cCI6MTYyNDI2MjkwOH0.8YITBWt6SXikoaBHf-SlOh_h7ii0UgwY_5-bjCirY",
  expires: "7d",
  user: {
    _id: "6098f5b516905536e818f8cc",
    roles: ["User"],
    email: "user2@gmail.com",
    name: "Real user",
    date_of_birth: null,
    address: "",
    phone: "",
    createdAt: "2021-05-10T08:58:29.081Z",
    updatedAt: "2021-05-10T08:58:29.081Z",
    __v: 0,
  },
};

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
