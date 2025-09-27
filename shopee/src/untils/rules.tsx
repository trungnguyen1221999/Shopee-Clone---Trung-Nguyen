// import type { RegisterOptions } from "react-hook-form";
import * as yup from "yup";
// interface RuleTypes {
//   email: RegisterOptions;
//   password: RegisterOptions;
//   confirmation_password: (getPassword: () => string) => RegisterOptions;
// }

// const rules: RuleTypes = {
//   email: {
//     required: {
//       value: true,
//       message: "Email is required",
//     },
//     minLength: {
//       value: 5,
//       message: "Email must be at least 5 characters and max 100 characters",
//     },
//     maxLength: {
//       value: 100,
//       message: "Email must be at least 5 characters and max 100 characters",
//     },
//     pattern: {
//       value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
//       message: "Invalid email address",
//     },
//   },
//   password: {
//     required: {
//       value: true,
//       message: "Password is required",
//     },
//     minLength: {
//       value: 8,
//       message: "Password must be at least 8 characters and max 30 characters",
//     },
//     maxLength: {
//       value: 30,
//       message: "Password must be at least 8 characters and max 30 characters",
//     },
//     pattern: {
//       value:
//         /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-[\]{};':"\\|,.<>/?]).+$/,
//       message:
//         "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character",
//     },
//   },
//   confirmation_password: (getPassword) => ({
//     required: {
//       value: true,
//       message: "Confirmation Password is required",
//     },
//     validate: (value: string) =>
//       value === getPassword() || "Passwords do not match",
//   }),
// };

// export default rules;

// interface LoginRulesTypes {
//   email: RegisterOptions;
//   password: RegisterOptions;
// }

// export const LoginRules: LoginRulesTypes = {
//   email: rules.email,
//   password: rules.password,
// };

export const RegisterSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .min(8, "Email must be at least 8 characters and max 100 characters")
    .max(100, "Email must be at least 8 characters and max 100 characters")
    .email("Invalid email address"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters and max 30 characters")
    .max(30, "Password must be at least 8 characters and max 30 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-[\]{};':"\\|,.<>/?]).+$/,
      "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character"
    ),
  confirmation_password: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Confirmation Password is required"),
});

export type RegisterSchemaType = yup.InferType<typeof RegisterSchema>;

export const LoginSchema = RegisterSchema.omit(["confirmation_password"]);
export type LoginSchemaType = yup.InferType<typeof RegisterSchema>;
