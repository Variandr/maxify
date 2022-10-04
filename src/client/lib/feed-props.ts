import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import prisma from '@server/db/prisma'
import { omit } from 'lodash'

export const getFeedStaticProps = async ({
  params,
  preview,
}: GetStaticPropsContext<{}>) => {
  try {
    const organization = await prisma.organization.findUnique({
      where: {
        id: 'test',
      },
    })
    if (!organization) return null

    const incomes = await prisma.income.findMany({
      where: {
        organizationId: organization.id,
      },
    })
    const incomesMap = incomes?.map((it) => omit(it, 'organizationId'))

    const employees = await prisma.employee.findMany({
      where: {
        organizationId: organization.id,
      },
      include: {
        profile: {
          select: {
            name: true,
            surname: true,
            age: true,
            avatarUrl: true,
          },
        },
      },
    })
    const employeesMap = employees?.map((it) =>
      omit(it, ['organizationId', 'profileId'])
    )

    const orders = await prisma.order.findMany({
      where: {
        organizationId: organization.id,
      },
      include: {
        client: true,
      },
    })
    const ordersMap = orders?.map((it) =>
      omit(it, ['organizationId', 'clientId'])
    )

    const products = await prisma.product.findMany({
      where: {
        organizationId: organization.id,
      },
      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
    })
    const productMap = products?.map((it) => ({
      ...omit(it, ['categoryId', 'organizationId']),
      categoryName: it?.category?.name ?? null,
    }))

    return {
      props: {
        organization,
        incomes: incomesMap ?? [],
        employees: employeesMap ?? [],
        products: productMap ?? [],
        orders: ordersMap ?? [],
      },
    }
  } catch (err) {
    console.log(err)
  }
}

export type FeedPropsType = InferGetStaticPropsType<typeof getFeedStaticProps>
