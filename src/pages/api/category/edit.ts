import { NextApiRequest, NextApiResponse } from 'next'
import ErrorService from '@lib/error-service'
import { ErrorMessage } from '@lib/types/api'
import prisma from '@server/db/prisma'
import * as yup from 'yup'

const JWT_SECRET_TOKEN = process.env.JWT_TOKEN

const schema = yup
  .object()
  .shape({
    name: yup.string().required(),
  })
  .required()

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method != 'PATCH') {
    return
  }

  try {
    const accessToken = req.headers.authorization?.split(' ')[1]
    if (accessToken && JWT_SECRET_TOKEN) {
      const category = await prisma.category.findUnique({
        where: {
          id: req.query.categoryId as string,
        },
      })

      const isValid = await schema.validate(req.body)

      if (isValid && category) {
        const updatedCategory = await prisma.product.update({
          where: {
            id: req.query.productId as string,
          },
          data: {
            name: isValid.name,
          },
        })
        res.status(200).send(updatedCategory)
      } else {
        res.status(400).send({ message: ErrorMessage.YOU_HAVE_INCORRECT_DATA })
      }
    } else res.status(401).send({ message: ErrorMessage.UNAUTHORIZED })
  } catch (err) {
    if (err instanceof Error) ErrorService.handle(err)
  }
}

export default handler
