import type { NextApiRequest, NextApiResponse } from 'next'
import ErrorService from '@lib/error-service'
import { serialize } from 'cookie'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return
  }

  try {
    res.setHeader('Set-Cookie', [
      serialize('accessToken', '', {
        maxAge: -1,
      }),
    ])
    res.status(200).send({ success: true })
  } catch (err) {
    if (err instanceof Error) ErrorService.handle(err)
    res.status(500).send({ success: false })
  }
}

export default handler
