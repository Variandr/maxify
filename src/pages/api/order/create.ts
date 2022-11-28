import { NextApiRequest, NextApiResponse } from 'next'
import ErrorService from '@lib/error-service'
import { ErrorMessage } from '@lib/types/api'
import * as yup from 'yup'
import prisma from '@server/db/prisma'
import { DeliveryStatus } from '@lib/types'

const JWT_SECRET_TOKEN = process.env.JWT_TOKEN

const schema = yup
  .object()
  .shape({
    organizationId: yup.string().required(),
    totalPrice: yup.number().required(),
    discount: yup.number(),
    status: yup.string(),
    deliveryStatus: yup.string(),
    product: yup.array().required(),
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
        const newOrder = await prisma.order.create({
          data: {
            organizationId: req.query.organizationId as string,
            totalPrice: isValid.totalPrice,
            ...(isValid?.discount && { discount: isValid.discount }),
            status: isValid.status,
            deliveryStatus: DeliveryStatus.NOT_DELIVERED,
            clientId: req.query.clientId,
            product: isValid.product,
          },
        })
        res.status(400).send(newOrder)
      } else {
        res.status(403).send({ message: ErrorMessage.YOU_HAVE_INCORRECT_DATA })
      }
    } else res.status(401).send({ message: ErrorMessage.UNAUTHORIZED })
  } catch (err) {
    if (err instanceof Error) ErrorService.handle(err)
  }
}

export default handler
