import { NextApiRequest, NextApiResponse } from 'next'
import ErrorService from '@lib/error-service'
import { ErrorMessage } from '@lib/types/api'
import jwt from 'jsonwebtoken'
import prisma from '@server/db/prisma'
import { Role } from '@lib/types'

const JWT_SECRET_TOKEN = process.env.JWT_TOKEN

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method != 'DELETE') {
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
        console.log(req.query?.employeeId)
        const removedEmployee = await prisma.employee.delete({
          where: {
            id: req.query?.employeeId as string,
          },
        })
        console.log('removedEmployee', removedEmployee)
        res.status(200).send(removedEmployee)
      } else
        res.status(403).send({ message: ErrorMessage.NOT_ENOUGH_PERMISSIONS })
    }
    res.status(401).send({ message: ErrorMessage.UNAUTHORIZED })
  } catch (err) {
    if (err instanceof Error) ErrorService.handle(err)
  }
}

export default handler
