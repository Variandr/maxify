import { $authHost } from '@lib/interceptors'
import { Employee } from '@lib/types'

const editEmployee = async (employee: Employee): Promise<Employee> => {
  return await $authHost
    .patch(`/api/employee/edit?employeeId=${employee.id}`, employee)
    .then((res) => res.data)
}
export default editEmployee
