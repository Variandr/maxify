import { Income } from '@lib/types'
import { $authHost } from '@lib/interceptors'

export const getIncomesByOrganizationId = async (
  orgId: string
): Promise<Income[]> => {
  return await $authHost
    .get(`/api/income/get?organizationId=${orgId}`)
    .then((res) => res.data)
}
