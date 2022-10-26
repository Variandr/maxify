import { NextApiRequest, NextApiResponse } from 'next'
import ErrorService from '@lib/error-service'

const JWT_SECRET_TOKEN = process.env.JWT_TOKEN

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method != 'PUT') {
    return
  }

  try {
    const accessToken = req.headers.authorization ?? ''
    if (accessToken && JWT_SECRET_TOKEN) {
      // await prisma.profile.update()
    }
    res.status(401).send({ message: 'You need to be authorized!' })
  } catch (err) {
    if (err instanceof Error) ErrorService.handle(err)
  }
}

export default handler
