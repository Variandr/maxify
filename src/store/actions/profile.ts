import { SET_IS_AUTHORIZED } from '../reducers/profile'

enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
  OWNER = 'OWNER',
}
interface Profile {
  id: string
  role: Role
  name: string
  surname: string
  avatarUrl: string | null
  age?: number
  email: string
  employeeId: string | null
}

export const setAuthStatus = (status: boolean) => ({
  type: SET_IS_AUTHORIZED,
  payload: status,
})

export const setProfile = (profile: Profile) => ({
  type: SET_IS_AUTHORIZED,
  payload: profile,
})
