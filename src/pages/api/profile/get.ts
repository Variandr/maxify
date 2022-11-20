import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@server/db/prisma'
import { ErrorMessage } from '@lib/types/api'
import ErrorService from '@lib/error-service'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return
  }
  try {
    if (req.query) {
      const profile = await prisma.profile.findUnique({
        where: {
          //@ts-ignore
          email: req.query.email,
        },
        include: {
          employee: true,
        },
      })
      res.status(200).send(profile)
    }
    res.status(401).send({ message: ErrorMessage.UNAUTHORIZED })
  } catch (err) {
    if (err instanceof Error) ErrorService.handle(err)
    res.status(500).send(err)
  }
}

export default handler
