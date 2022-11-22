import { Organization } from '@lib/types'
import { $authHost } from '@lib/interceptors'

export const getOrganizations = async (): Promise<Organization[]> => {
  return await $authHost.get(`/api/organization/get`).then((res) => res.data)
}
