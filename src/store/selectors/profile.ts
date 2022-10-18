import { Profile } from '@lib/types'

export const getProfile = (state): Profile => {
  return state.profile.profile
}
