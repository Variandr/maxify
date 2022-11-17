import { NextApiRequest, NextApiResponse } from 'next'
import ErrorService from '@lib/error-service'
import { ErrorMessage } from '@lib/types/api'
import jwt from 'jsonwebtoken'
import prisma from '@server/db/prisma'
import { Role } from '@lib/types'
import * as yup from 'yup'

const JWT_SECRET_TOKEN = process.env.JWT_TOKEN

const schema = yup
  .object()
  .shape({
    position: yup.string().required(),
    salary: yup.number().required(),
    profileId: yup.string().required(),
  })
  .required()

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method != 'POST') {
    return
  }

  try {
    const accessToken = req.headers.authorization?.split(' ')[1]
    if (accessToken && JWT_SECRET_TOKEN) {
      //@ts-ignore
      const tokenData: Token = jwt.verify(accessToken, JWT_SECRET_TOKEN)
      const profile = await prisma.profile.findUnique({
        where: {
          email: tokenData?.email,
        },
      })
      if (profile && profile.role !== Role.USER) {
        const isValid = await schema.validate(req.body)

        if (isValid) {
          const addedEmployee = await prisma.employee.create({
            data: isValid,
          })
          console.log('addedEmployee', addedEmployee)
          res.status(400).send(addedEmployee)
        } else {
          res
            .status(400)
            .send({ message: ErrorMessage.YOU_HAVE_INCORRECT_DATA })
        }
      } else
        res.status(403).send({ message: ErrorMessage.NOT_ENOUGH_PERMISSIONS })
    }
    res.status(401).send({ message: ErrorMessage.UNAUTHORIZED })
  } catch (err) {
    if (err instanceof Error) ErrorService.handle(err)
  }
}

export default handler
