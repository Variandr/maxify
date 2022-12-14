import { NextApiRequest, NextApiResponse } from 'next'
import ErrorService from '@lib/error-service'
import { ErrorMessage } from '@lib/types/api'
import prisma from '@server/db/prisma'

const JWT_SECRET_TOKEN = process.env.JWT_TOKEN

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method != 'GET') {
    return
  }

  try {
    const accessToken = req.headers.authorization?.split(' ')[1]
    if (accessToken && JWT_SECRET_TOKEN) {
      const categories = await prisma.category.findMany()

      res.status(200).send(categories)
    } else res.status(401).send({ message: ErrorMessage.UNAUTHORIZED })
  } catch (err) {
    if (err instanceof Error) ErrorService.handle(err)
  }
}

export default handler
