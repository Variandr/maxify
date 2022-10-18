import type { NextApiRequest, NextApiResponse } from 'next'
import ErrorService from '@lib/error-service'
import prisma from '@server/db/prisma'
import jwt from 'jsonwebtoken'
import { parse, serialize } from 'cookie'
import generateToken from '@lib/generate-token'

const JWT_SECRET_TOKEN = process.env.JWT_TOKEN

interface Token {
  email: string
  profileId: string
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return
  }

  try {
    const accessToken = parse(req?.headers?.cookie ?? '')?.accessToken
    if (accessToken && JWT_SECRET_TOKEN) {
      //@ts-ignore
      const tokenData: Token = jwt.verify(accessToken, JWT_SECRET_TOKEN)
      const profile = await prisma.profile.findUnique({
        where: {
          email: tokenData?.email,
        },
      })

      if (profile) {
        const accessToken = generateToken(profile)
        res.setHeader(
          'Set-Cookie',
          serialize('accessToken', accessToken, { maxAge: 60 * 60 * 24 * 7 })
        )
        res.status(200).send(profile)
      } else {
        res.status(404).send({})
      }
    } else {
      res.status(404).send({})
    }
  } catch (err) {
    if (err instanceof Error) ErrorService.handle(err)
  }
}

export default handler
