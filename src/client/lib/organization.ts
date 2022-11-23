import { Organization } from '@lib/types'
import { $authHost } from '@lib/interceptors'
import { OrganizationFormI } from '@components/organizations/OrganizationForm'

export const getOrganizations = async (): Promise<Organization[]> => {
  return await $authHost.get(`/api/organization/get`).then((res) => res.data)
}

export const removeOrganization = async (id: string): Promise<Organization> => {
  return await $authHost
    .delete(`/api/organization/delete?organizationId=${id}`)
    .then((res) => res.data)
}

export const updateOrganization = async (
  organization: OrganizationFormI,
  id: string
): Promise<Organization> => {
  return await $authHost
    .patch(`/api/organization/edit?organizationId=${id}`, organization)
    .then((res) => res.data)
}

export const createOrganization = async (
  organization: OrganizationFormI
): Promise<Organization> => {
  return await $authHost
    .post(`/api/organization/create`, organization)
    .then((res) => res.data)
}
