import { Profile } from '@lib/types'
import { StateType } from '@store/store'

export const getProfile = (state: StateType): Profile => {
  return state.profile.profile
}
