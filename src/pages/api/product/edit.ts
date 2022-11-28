import { NextApiRequest, NextApiResponse } from 'next'
import ErrorService from '@lib/error-service'
import { ErrorMessage } from '@lib/types/api'
import prisma from '@server/db/prisma'
import * as yup from 'yup'

const JWT_SECRET_TOKEN = process.env.JWT_TOKEN

const schema = yup
  .object()
  .shape({
    categoryId: yup.string(),
    description: yup.string(),
    name: yup.string(),
    price: yup.number(),
  })
  .required()

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method != 'PATCH') {
    return
  }

  try {
    const accessToken = req.headers.authorization?.split(' ')[1]
    if (accessToken && JWT_SECRET_TOKEN) {
      const product = await prisma.product.findUnique({
        where: {
          id: req.query.productId as string,
        },
      })

      const isValid = await schema.validate(req.body)

      if (isValid && product) {
        const updatedProduct = await prisma.product.update({
          where: {
            id: req.query.productId as string,
          },
          data: {
            ...(isValid.categoryId && { categoryId: isValid.categoryId }),
            ...(isValid.description && { description: isValid.description }),
            ...(isValid.name && { name: isValid.name }),
            ...(isValid.price && { price: isValid.price }),
          },
        })
        res.status(200).send(updatedProduct)
      } else {
        res.status(400).send({ message: ErrorMessage.YOU_HAVE_INCORRECT_DATA })
      }
    } else res.status(401).send({ message: ErrorMessage.UNAUTHORIZED })
  } catch (err) {
    if (err instanceof Error) ErrorService.handle(err)
  }
}

export default handler
