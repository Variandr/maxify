import { $authHost } from '@lib/interceptors'

const getProfile = async (email: string) => {
  return await $authHost
    .get(`/api/profile/get?email=${email}`)
    .then((res) => res.data)
}
export default getProfile
