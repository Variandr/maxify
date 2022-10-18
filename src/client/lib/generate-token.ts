import jwt from 'jsonwebtoken'
import { Profile } from '@lib/types'

const JWT_SECRET_TOKEN = process.env.JWT_TOKEN

const generateToken = (profile: Profile) => {
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
