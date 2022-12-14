import { NextApiRequest, NextApiResponse } from 'next'
import ErrorService from '@lib/error-service'
import { ErrorMessage } from '@lib/types/api'
import prisma from '@server/db/prisma'
import * as yup from 'yup'

const JWT_SECRET_TOKEN = process.env.JWT_TOKEN

const schema = yup
  .object()
  .shape({
    clientId: yup.string(),
    totalPrice: yup.number(),
    discount: yup.number(),
    status: yup.string(),
    deliveryStatus: yup.string(),
    product: yup.array(),
  })
  .required()

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method != 'PATCH') {
    return
  }

  try {
    const accessToken = req.headers.authorization?.split(' ')[1]
    if (accessToken && JWT_SECRET_TOKEN) {
      const order = await prisma.order.findUnique({
        where: {
          id: req.query.orderId as string,
        },
      })

      const isValid = await schema.validate(req.body)

      if (isValid && order) {
        const updatedOrder = await prisma.order.update({
          where: {
            id: req.query.orderId as string,
          },
          data: {
            ...(isValid.totalPrice && { totalPrice: isValid.totalPrice }),
            ...(isValid.discount && { discount: isValid.discount }),
            ...(isValid.status && { status: isValid.status }),
            ...(isValid.deliveryStatus && {
              deliveryStatus: isValid.deliveryStatus,
            }),
            ...(isValid.product && { product: isValid.product }),
            ...(isValid.clientId && { clientId: isValid.clientId }),
          },
        })
        res.status(200).send(updatedOrder)
      } else {
        res.status(400).send({ message: ErrorMessage.YOU_HAVE_INCORRECT_DATA })
      }
    } else res.status(401).send({ message: ErrorMessage.UNAUTHORIZED })
  } catch (err) {
    if (err instanceof Error) ErrorService.handle(err)
  }
}

export default handler
