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
    surname: yup.string().required(),
    phoneNumber: yup.string(),
    address: yup.string(),
    city: yup.string(),
    birthday: yup.date(),
    email: yup.string().email().required(),
  })
  .required()

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method != 'PUT') {
    return
  }

  try {
    const accessToken = req.headers.authorization?.split(' ')[1]
    if (accessToken && JWT_SECRET_TOKEN && req.query) {
      const userId = req.query.userId
      const isValid = await schema.validate(req.body)

      if (isValid) {
        const updatedProfile = await prisma.profile.update({
          where: {
            //@ts-ignore
            id: userId,
          },
          data: req.body,
        })
        res.status(200).send({ profile: updatedProfile })
      } else {
        res.status(400).send({ message: ErrorMessage.YOU_HAVE_INCORRECT_DATA })
      }
    }
    return res.status(401).send({ message: ErrorMessage.UNAUTHORIZED })
  } catch (err) {
    if (err instanceof Error) {
      ErrorService.handle(err)
      res.status(400).send(err)
    }
  }
}

export default handler
