export const SET_PROFILE = 'SET_PROFILE'
export const SET_IS_AUTHORIZED = 'SET_IS_AUTHORIZED'

interface IProfile {
  profile: any
  isAuth: boolean
}

const initialValue: IProfile = {
  profile: {},
  isAuth: false,
}

export const profileReducer = (state = initialValue, action: any) => {
  switch (action.type) {
    case SET_IS_AUTHORIZED: {
      console.log('123')
      return { ...state, isAuth: action.payload }
    }
    default:
      return state
  }
}