import { NextApiRequest, NextApiResponse } from 'next'
import ErrorService from '@lib/error-service'
import { ErrorMessage } from '@lib/types/api'
import * as yup from 'yup'
import prisma from '@server/db/prisma'

const JWT_SECRET_TOKEN = process.env.JWT_TOKEN

const schema = yup
  .object()
  .shape({
    categoryId: yup.string().required(),
    name: yup.string().required(),
    price: yup.number().required(),
    description: yup.string(),
  })
  .required()

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method != 'POST') {
    return
  }

  try {
    const accessToken = req.headers.authorization?.split(' ')[1]
    if (accessToken && JWT_SECRET_TOKEN) {
      const isValid = await schema.validate(req.body)
      if (isValid && req.query) {
        const newProduct = await prisma.product.create({
          data: {
            //@ts-ignore
            organizationId: req.query.organizationId as string,
            categoryId: isValid.categoryId,
            name: isValid.name,
            price: isValid.price,
            description: isValid.description,
          },
        })
        res.status(200).send(newProduct)
      } else {
        res.status(403).send({ message: ErrorMessage.YOU_HAVE_INCORRECT_DATA })
      }
    } else res.status(401).send({ message: ErrorMessage.UNAUTHORIZED })
  } catch (err) {
    if (err instanceof Error) ErrorService.handle(err)
  }
}

export default handler
