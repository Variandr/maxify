import type { NextApiRequest, NextApiResponse } from 'next'
import ErrorService from '@lib/error-service'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'DELETE') {
    return
  }

  try {
    res.removeHeader('accessToken')
    res.status(200).send({ success: true })
  } catch (e) {
    ErrorService.handle(e)
  }
}

export default handler
