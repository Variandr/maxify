import {
  SET_IS_AUTHORIZED,
  SET_ORGANIZATION,
  SET_PROFILE,
  UPDATE_PROFILE,
} from '../reducers/profile'
import { Organization, Profile } from '@lib/types'

export const setAuthStatus = (status: boolean) => ({
  type: SET_IS_AUTHORIZED,
  payload: status,
})

export const setProfile = (profile: Profile | null) => ({
  type: SET_PROFILE,
  payload: profile,
})

export const updateProfile = (profile: Profile | null) => ({
  type: UPDATE_PROFILE,
  payload: profile,
})

export const setOrganization = (organization: Organization | null) => ({
  type: SET_ORGANIZATION,
  payload: organization,
})
