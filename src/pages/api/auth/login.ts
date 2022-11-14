import type { NextApiRequest, NextApiResponse } from 'next'
import * as yup from 'yup'
import ErrorService from '@lib/error-service'
import { ErrorMessage } from '@lib/types/api'
import prisma from '@server/db/prisma'
import bcrypt from 'bcrypt'
import generateToken from '@lib/generate-token'

const schema = yup
  .object()
  .shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required()

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return
  }

  try {
    const isValid = await schema.validate(req.body)
    if (Boolean(isValid)) {
      const profile = await prisma.profile.findUnique({
        where: {
          email: isValid.email,
        },
      })

      if (profile) {
        const passwordSync = bcrypt.compareSync(
          isValid.password,
          profile.password
        )
        if (passwordSync) {
          const accessToken = generateToken(profile)
          res.status(200).send({ token: accessToken })
        } else {
          res.status(404).send({ message: ErrorMessage.INCORRECT_PASSWORD })
          ErrorService.handle(ErrorMessage.INCORRECT_PASSWORD)
        }
      } else {
        res.status(404).send({ message: ErrorMessage.ACCOUNT_WAS_NOT_FOUND })
        ErrorService.handle(ErrorMessage.ACCOUNT_WAS_NOT_FOUND)
      }
    } else {
      res.status(400).send({ message: ErrorMessage.YOU_HAVE_INCORRECT_DATA })
      ErrorService.handle(ErrorMessage.YOU_HAVE_INCORRECT_DATA)
    }
  } catch (err) {
    if (err instanceof Error) ErrorService.handle(err)
    res.status(500).send(err)
  }
}

export default handler
