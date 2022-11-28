import { NextApiRequest, NextApiResponse } from 'next'
import ErrorService from '@lib/error-service'
import { ErrorMessage, InfoMessage } from '@lib/types/api'
import prisma from '@server/db/prisma'

const JWT_SECRET_TOKEN = process.env.JWT_TOKEN

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method != 'DELETE') {
    return
  }

  try {
    const accessToken = req.headers.authorization?.split(' ')[1]
    if (accessToken && JWT_SECRET_TOKEN) {
      const product = await prisma.category.findUnique({
        where: {
          id: req.query.categoryId as string,
        },
      })

      if (product && req.query) {
        await prisma.product.delete({
          where: {
            id: req.query.categoryId as string,
          },
        })
        res.status(200).send({ message: InfoMessage.SUCCESSFULLY_DELETED })
      } else {
        res.status(403).send({ message: ErrorMessage.YOU_HAVE_INCORRECT_DATA })
      }
    } else res.status(401).send({ message: ErrorMessage.UNAUTHORIZED })
  } catch (err) {
    if (err instanceof Error) ErrorService.handle(err)
  }
}

export default handler
