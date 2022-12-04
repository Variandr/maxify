import { Organization, Profile } from '@lib/types'
import { StateType } from '@store/store'

export const getProfile = (state: StateType): Profile => {
  return state.profile.profile
}

export const getOrganization = (state: StateType): Organization => {
  return state.profile.organization
}
