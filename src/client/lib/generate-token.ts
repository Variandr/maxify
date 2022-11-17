import jwt from 'jsonwebtoken'
import { Profile } from '@lib/types'
import { profile } from '@prisma/client'

const JWT_SECRET_TOKEN = process.env.JWT_TOKEN

const generateToken = (profile: Profile | profile) => {
  return JWT_SECRET_TOKEN
    ? jwt.sign(
        {
          email: profile.email,
          profileId: profile.id,
        },
        JWT_SECRET_TOKEN,
        { expiresIn: '7d' }
      )
    : ''
}
export default generateToken
