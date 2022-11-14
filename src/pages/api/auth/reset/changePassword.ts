import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@server/db/prisma'
import ErrorService from '@lib/error-service'
import * as yup from 'yup'
import bcrypt from 'bcrypt'
import generateToken from '@lib/generate-token'

const schema = yup
  .object()
  .shape({
    newPassword: yup.string().required(),
    email: yup.string().email().required(),
  })
  .required()

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'PUT') {
    return
  }
  try {
    const isValid = await schema.validate(req.body)
    if (isValid) {
      const password = bcrypt.hashSync(
        isValid.newPassword,
        bcrypt.genSaltSync(10)
      )
      const profile = await prisma.profile.update({
        where: {
          email: isValid.email,
        },
        data: {
          password,
        },
      })
      const accessToken = generateToken(profile)
      if (profile) {
        res.status(200).send({ profile, token: accessToken })
      } else {
        res.status(404).send({})
      }
    } else {
      res.status(404).send({})
    }
  } catch (err) {
    if (err instanceof Error) ErrorService.handle(err)
    res.status(500).send(err)
  }
}

export default handler
