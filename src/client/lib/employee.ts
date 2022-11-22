import { $authHost } from '@lib/interceptors'
import { Employee } from '@lib/types'
import { AddEmployeeForm } from '@components/employees/AddEmployee'

export interface EmployeeData extends AddEmployeeForm {
  organizationId: string
}

export const editEmployee = async (employee: Employee): Promise<Employee> => {
  return await $authHost
    .patch(`/api/employee/edit?employeeId=${employee.id}`, employee)
    .then((res) => res.data)
}

export const deleteEmployee = async (employeeId: string): Promise<Employee> => {
  return await $authHost
    .delete(`/api/employee/delete?employeeId=${employeeId}`)
    .then((res) => res.data)
}

export const addEmployee = async (
  employee: EmployeeData
): Promise<Employee> => {
  return await $authHost
    .post('/api/employee/create', employee)
    .then((res) => res.data)
}

export const getEmployeesByOrganization = async (
  orgId: string
): Promise<Employee[]> => {
  return await $authHost
    .get(`/api/employee/get?organizationId=${orgId}`)
    .then((res) => res.data)
}
