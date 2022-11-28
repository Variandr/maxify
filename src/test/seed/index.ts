// @ts-nocheck

import { Prisma } from '@prisma/client'
import prisma from '../../server/db/prisma'
import { testData } from './data'
import { Organization } from '../../client/lib/types'

async function seedOrganization(org: Organization) {
  const categories = await Promise.all(
    testData.categories.map((it) =>
      prisma.category.create({
        data: it,
      })
    )
  )

  await Promise.all(
    testData.incomes.map((it) =>
      prisma.income.create({
        data: {
          ...it,
          organizationId: org.id,
        },
      })
    )
  )

  const clients = await Promise.all(
    testData.clients.map((it) =>
      prisma.client.create({
        data: it,
      })
    )
  )

  const profiles = await Promise.all(
    testData.profiles.map((it) =>
      prisma.profile.create({
        data: it,
      })
    )
  )

  await Promise.all(
    testData.employees.map((it, i) =>
      prisma.employee.create({
        data: {
          ...it,
          organizationId: org.id,
          profileId: profiles[i]?.id ?? profiles[0]?.id,
        },
      })
    )
  )

  await Promise.all(
    testData.products.map((it, i) =>
      prisma.product.create({
        data: {
          ...it,
          organizationId: org.id,
          categoryId: i % 2 === 0 ? categories[0]?.id : categories[1]?.id,
        },
      })
    )
  )

  await Promise.all(
    testData.orders.map((it, i) =>
      prisma.order.create({
        data: {
          ...it,
          organizationId: org.id,
          clientId: i % 2 === 0 ? clients[0]?.id : clients[1]?.id,
        },
      })
    )
  )
}

async function seedDatabase() {
  const organizations = await Promise.all(
    testData.organizations.map((org) =>
      prisma.organization.create({
        data: {
          ...org,
        },
      })
    )
  )

  await Promise.all(organizations.map((org, i) => seedOrganization(org, i)))
}

export async function emptyDatabase() {
  const tables = Prisma.dmmf.datamodel.models.map(
    (model) => model.dbName || model.name
  )

  await Promise.all(
    tables.map((table) => prisma.$executeRawUnsafe(`DELETE FROM "${table}";`))
  )
}

export async function wipeDatabase() {
  await prisma.product.deleteMany({})
  await prisma.income.deleteMany({})
  await prisma.category.deleteMany({})
  await prisma.employee.deleteMany({})
  await prisma.profile.deleteMany({})
  await prisma.client.deleteMany({})
  await prisma.order.deleteMany({})
  await prisma.organization.deleteMany({})
}

export async function reseedDatabase() {
  try {
    await wipeDatabase()
    await seedDatabase()
  } catch (err) {
    if (err instanceof Error) console.error(err.message)
  }
}

reseedDatabase()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
