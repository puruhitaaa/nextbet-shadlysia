import dotenv from "dotenv"
import { defineConfig, env } from "prisma/config"

dotenv.config()

export default defineConfig({
  schema: "src/server/db/prisma/schema",
  migrations: {
    path: "src/server/db/prisma/migrations",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
})
