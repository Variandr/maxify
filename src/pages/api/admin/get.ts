import { NextApiRequest, NextApiResponse } from 'next'
import ErrorService from '@lib/error-service'
import { ErrorMessage } from '@lib/types/api'
import jwt from 'jsonwebtoken'
import prisma from '@server/db/prisma'
import { Role } from '@lib/types'
import { omit } from 'lodash'

const JWT_SECRET_TOKEN = process.env.JWT_TOKEN

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method != 'GET') {
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

      if (profile && profile.role === Role.OWNER) {
        const users = await prisma.profile.findMany({
          include: {
            employee: {
              include: {
                organization: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        })
        const usersMap = users.map((it) => omit(it, ['password']))
        res.status(200).send(usersMap)
      } else
        res.status(403).send({ message: ErrorMessage.NOT_ENOUGH_PERMISSIONS })
    } else res.status(401).send({ message: ErrorMessage.UNAUTHORIZED })
  } catch (err) {
    if (err instanceof Error) ErrorService.handle(err)
  }
}

export default handler
