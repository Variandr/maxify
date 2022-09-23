import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import prisma from '@server/db/prisma'

export const getFeedStaticProps = async ({
  params,
  preview,
}: GetStaticPropsContext<{}>) => {
  try {
    const organization = await prisma.organization.findUnique({
      where: {
        id: 'test',
      },
      include: {
        income: true,
        employee: true,
        product: true,
        order: true,
      },
    })
    return {
      props: {
        organization,
        income: organization?.income ?? [],
        employee: organization?.employee ?? [],
        product: organization?.product ?? [],
        order: organization?.order ?? [],
      },
    }
  } catch (err) {
    console.log(err)
  }
}

export type FeedPropsType = InferGetStaticPropsType<typeof getFeedStaticProps>
