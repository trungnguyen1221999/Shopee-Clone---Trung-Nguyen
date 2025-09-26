import type { RegisterOptions } from "react-hook-form";

interface RuleTypes {
  email: RegisterOptions;
  password: RegisterOptions;
  confirmation_password: (getPassword: () => string) => RegisterOptions;
}

const rules: RuleTypes = {
  email: {
    required: {
      value: true,
      message: "Email is required",
    },
    minLength: {
      value: 5,
      message: "Email must be at least 5 characters and max 100 characters",
    },
    maxLength: {
      value: 100,
      message: "Email must be at least 5 characters and max 100 characters",
    },
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: "Invalid email address",
    },
  },
  password: {
    required: {
      value: true,
      message: "Password is required",
    },
    minLength: {
      value: 8,
      message: "Password must be at least 8 characters and max 30 characters",
    },
    maxLength: {
      value: 30,
      message: "Password must be at least 8 characters and max 30 characters",
    },
  },
  confirmation_password: (getPassword) => ({
    required: {
      value: true,
      message: "Password is required",
    },
    minLength: {
      value: 8,
      message: "Password must be at least 8 characters and max 30 characters",
    },
    maxLength: {
      value: 300,
      message: "Password must be at least 8 characters and max 30 characters",
    },
    validate: (value: string) =>
      value === getPassword() || "Passwords do not match",
  }),
};

export default rules;
