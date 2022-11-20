import { $authHost } from '@lib/interceptors'
import { Employee } from '@lib/types'

const getEmployeesByOrganization = async (
  orgId: string
): Promise<Employee[]> => {
  return await $authHost
    .get(`/api/employee/get?organizationId=${orgId}`)
    .then((res) => res.data)
}
export default getEmployeesByOrganization
