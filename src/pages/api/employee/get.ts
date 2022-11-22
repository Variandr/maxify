import { NextApiRequest, NextApiResponse } from 'next'
import ErrorService from '@lib/error-service'
import { ErrorMessage } from '@lib/types/api'
import jwt from 'jsonwebtoken'
import prisma from '@server/db/prisma'
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

      if (profile) {
        const employees = await prisma.employee.findMany({
          where: {
            organizationId: req.query.organizationId as string,
          },
          include: {
            profile: {
              select: {
                name: true,
                surname: true,
                age: true,
                avatarUrl: true,
                email: true,
                phoneNumber: true,
                city: true,
                gender: true,
                birthday: true,
                address: true,
              },
            },
          },
        })

        const employeesMap = employees?.map((it) => {
          const protectedProfile = omit(it.profile, ['password'])
          return omit({ ...it, profile: protectedProfile }, [
            'organizationId',
            'profileId',
          ])
        })
        res.status(200).send(employeesMap)
      } else res.status(404).send({ message: ErrorMessage.UNAUTHORIZED })
    } else res.status(401).send({ message: ErrorMessage.UNAUTHORIZED })
  } catch (err) {
    if (err instanceof Error) ErrorService.handle(err)
  }
}

export default handler
