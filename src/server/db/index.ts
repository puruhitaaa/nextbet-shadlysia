import { PrismaPg } from "@prisma/adapter-pg"
import { env } from "@/env.mjs"
import { PrismaClient } from "./prisma/generated/prisma/client"

const connectionString = env.DATABASE_URL

const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

export { prisma }
