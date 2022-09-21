import { reseedDatabase } from '../../test/seed'
import prisma from './prisma'

reseedDatabase()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
