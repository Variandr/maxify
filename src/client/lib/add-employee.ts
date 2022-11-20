import { $authHost } from '@lib/interceptors'
import { Employee } from '@lib/types'

interface EmployeeData {
  position: string
  salary: number
  email: string
  name: string
  password: string
  organizationId: string
}

const addEmployee = async (employee: EmployeeData): Promise<Employee> => {
  return await $authHost
    .post('/api/employee/create', employee)
    .then((res) => res.data)
}
export default addEmployee
