import { NextApiRequest, NextApiResponse } from 'next'
import ErrorService from '@lib/error-service'
import { ErrorMessage } from '@lib/types/api'
import jwt from 'jsonwebtoken'
import prisma from '@server/db/prisma'
import { Role } from '@lib/types'
import { schema } from '@components/organizations/EditOrganization'

const JWT_SECRET_TOKEN = process.env.JWT_TOKEN

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method != 'PATCH') {
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
        const isValid = await schema.validate(req.body)
        if (isValid) {
          const updatedOrganization = await prisma.organization.update({
            where: {
              id: req.query.organizationId as string,
            },
            data: isValid,
          })
          res.status(200).send(updatedOrganization)
        } else
          res
            .status(400)
            .send({ message: ErrorMessage.YOU_HAVE_INCORRECT_DATA })
      } else
        res.status(403).send({ message: ErrorMessage.NOT_ENOUGH_PERMISSIONS })
    } else res.status(401).send({ message: ErrorMessage.UNAUTHORIZED })
  } catch (err) {
    if (err instanceof Error) ErrorService.handle(err)
  }
}

export default handler
