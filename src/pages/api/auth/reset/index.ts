import { NextApiRequest, NextApiResponse } from 'next'
import ErrorService from '@lib/error-service'
import { ErrorMessage, InfoMessage } from '@lib/types/api'
import * as yup from 'yup'
import prisma from '@server/db/prisma'
import { createTransport } from 'nodemailer'
import jwt from 'jsonwebtoken'
import ResetPassword from '@components/authorization/ResetPassword'
import { renderToStaticMarkup } from 'react-dom/server'

const JWT_SECRET_TOKEN = process.env.JWT_TOKEN
const EMAIL = process.env.NODEMAIL_EMAIL
const PASSWORD = process.env.NODEMAIL_PASSWORD
const schema = yup
  .object()
  .shape({
    email: yup.string().email().required(),
    host: yup.string().required(),
  })
  .required()

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method != 'POST') {
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

      if (profile && JWT_SECRET_TOKEN) {
        const restoreToken = jwt.sign(
          {
            email: profile.email,
          },
          JWT_SECRET_TOKEN,
          { expiresIn: '30m' }
        )
        const link = `${isValid.host}/reset?restoreToken=${restoreToken}`
        const transporter = createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
            user: EMAIL,
            pass: PASSWORD,
          },
        })

        const HTMLTemplate = renderToStaticMarkup(
          ResetPassword({ profile, link })
        )

        const test = await transporter.sendMail({
          from: 'Maxify support team',
          to: profile.email,
          subject: 'Reset your Maxify password',
          html: HTMLTemplate,
        })
        console.log(test)
        res.status(200).send({ message: InfoMessage.EMAIL_SENT })
      } else {
        res.status(404).send({ message: ErrorMessage.ACCOUNT_WAS_NOT_FOUND })
        ErrorService.handle(ErrorMessage.ACCOUNT_WAS_NOT_FOUND)
      }
    } else {
      res.status(400).send({ message: ErrorMessage.YOU_HAVE_INCORRECT_DATA })
    }
  } catch (err) {
    if (err instanceof Error) ErrorService.handle(err)
    res.status(500).send(err)
  }
}

export default handler
