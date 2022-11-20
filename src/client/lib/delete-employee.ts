import { $authHost } from '@lib/interceptors'
import { Employee } from '@lib/types'

const deleteEmployee = async (employeeId: string): Promise<Employee> => {
  return await $authHost
    .delete(`/api/employee/delete?employeeId=${employeeId}`)
    .then((res) => res.data)
}
export default deleteEmployee
