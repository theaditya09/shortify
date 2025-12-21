import { PrismaClient } from "@prisma/client"
import { withAccelerate } from "@prisma/extension-accelerate"

let prisma: ReturnType<typeof createPrisma> | null = null

function createPrisma(databaseUrl: string) {
  return new PrismaClient()
    .$extends(withAccelerate())
}

export function getPrisma(databaseUrl: string) {
  if (!prisma) {
    prisma = createPrisma(databaseUrl)
  }
  return prisma
}
