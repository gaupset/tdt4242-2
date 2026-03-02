import dotenv from "dotenv";
dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is required");
}

if (isProduction && !process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is required in production");
}

if (!process.env.JWT_SECRET) {
  console.warn("WARNING: Using default JWT secret. Set JWT_SECRET for production.");
}

export const env = {
  PORT: parseInt(process.env.PORT || "3001", 10),
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET || "dev-secret",
  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:5173",
};
