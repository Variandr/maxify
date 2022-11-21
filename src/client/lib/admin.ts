import { $authHost } from '@lib/interceptors'
import { Admin } from '@lib/types'

export const getAdmins = async (): Promise<Admin[]> => {
  return await $authHost.get(`/api/admin/get`).then((res) => res.data)
}
