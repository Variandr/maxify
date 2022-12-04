import { Organization, Profile } from '@lib/types'

export const SET_PROFILE = 'SET_PROFILE'
export const SET_ORGANIZATION = 'SET_ORGANIZATION'
export const SET_IS_AUTHORIZED = 'SET_IS_AUTHORIZED'
export const UPDATE_PROFILE = 'UPDATE_PROFILE'

interface IProfile {
  profile: Profile | null
  organization: Organization | null
  isAuth: boolean
}

const initialValue: IProfile = {
  profile: null,
  organization: null,
  isAuth: false,
}

export const profileReducer = (state = initialValue, action: any) => {
  switch (action.type) {
    case SET_IS_AUTHORIZED: {
      return { ...state, isAuth: action.payload }
    }
    case SET_PROFILE: {
      return { ...state, profile: action.payload }
    }
    case UPDATE_PROFILE: {
      return { ...state, profile: action.payload }
    }
    case SET_ORGANIZATION: {
      return { ...state, organization: action.payload }
    }
    default:
      return state
  }
}
