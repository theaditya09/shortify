import { PrismaClient } from "@prisma/client/edge"
import { withAccelerate } from "@prisma/extension-accelerate"

let prisma: ReturnType<typeof createPrisma> | null = null

function createPrisma(accelerateUrl: string) {
  return new PrismaClient({
    accelerateUrl, 
  }).$extends(withAccelerate())
}

export function getPrisma(accelerateUrl: string) {
  if (!prisma) {
    prisma = createPrisma(accelerateUrl)
  }
  return prisma
}
