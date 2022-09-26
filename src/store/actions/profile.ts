import { SET_IS_AUTHORIZED } from '../reducers/profile'

export const setAuthStatus = (status: boolean) => ({
  type: SET_IS_AUTHORIZED,
  payload: status,
})
