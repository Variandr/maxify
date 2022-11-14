import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@server/db/prisma'
import jwt from 'jsonwebtoken'
import ErrorService from '@lib/error-service'

const JWT_SECRET_TOKEN = process.env.JWT_TOKEN

interface Token {
  email: string
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return
  }
  try {
    if (req.query.restoreToken && JWT_SECRET_TOKEN) {
      //@ts-ignore
      const tokenData: Token = jwt.verify(
        req.query.restoreToken as string,
        JWT_SECRET_TOKEN
      )
      const profile = await prisma.profile.findUnique({
        where: {
          email: tokenData?.email,
        },
      })

      if (profile) {
        res.status(200).send({ email: profile.email })
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
