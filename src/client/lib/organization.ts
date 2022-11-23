import { Organization } from '@lib/types'
import { $authHost } from '@lib/interceptors'
import { OrganizationForm } from '@components/organizations/EditOrganization'

export const getOrganizations = async (): Promise<Organization[]> => {
  return await $authHost.get(`/api/organization/get`).then((res) => res.data)
}

export const removeOrganization = async (id: string): Promise<Organization> => {
  return await $authHost
    .delete(`/api/organization/delete?organizationId=${id}`)
    .then((res) => res.data)
}

export const updateOrganization = async (
  organization: OrganizationForm,
  id: string
): Promise<Organization> => {
  return await $authHost
    .patch(`/api/organization/edit?organizationId=${id}`, organization)
    .then((res) => res.data)
}
