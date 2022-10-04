import type { NextApiRequest, NextApiResponse } from 'next'
import * as yup from 'yup'
import ErrorService from '@lib/error-service'
import { ErrorMessage } from '@lib/types/api'
import prisma from '@server/db/prisma'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { serialize } from 'cookie'

const JWT_SECRET_TOKEN = process.env.JWT_TOKEN
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
          const accessToken = jwt.sign(
            {
              email: profile.email,
              profileId: profile.id,
            },
            JWT_SECRET_TOKEN,
            { expiresIn: '7d' }
          )
          res.setHeader(
            'Set-Cookie',
            serialize('accessToken', accessToken, { maxAge: 60 * 60 * 24 * 7 })
          )
          res.status(200).json(profile)
        } else {
          res.status(404).json({ message: ErrorMessage.INCORRECT_PASSWORD })
          ErrorService.handle(ErrorMessage.INCORRECT_PASSWORD)
        }
      } else {
        res.status(404).json({ message: ErrorMessage.ACCOUNT_WAS_NOT_FOUND })
        ErrorService.handle(ErrorMessage.ACCOUNT_WAS_NOT_FOUND)
      }
    } else {
      res.status(400).json({ message: ErrorMessage.YOU_HAVE_INCORRECT_DATA })
      ErrorService.handle(ErrorMessage.YOU_HAVE_INCORRECT_DATA)
    }
  } catch (e) {
    ErrorService.handle(e)
  }
}

export default handler
