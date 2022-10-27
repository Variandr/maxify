import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import prisma from '@server/db/prisma'
import { ErrorMessage } from '@lib/types/api'

const JWT_SECRET_TOKEN = process.env.JWT_TOKEN

interface Token {
  email: string
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
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
        include: {
          employee: true,
        },
      })
      res.status(200).send({ profile })
    }
    res.status(401).send({ message: ErrorMessage.UNAUTHORIZED })
  } catch (err) {}
}

export default handler
