import { $authHost } from '@lib/interceptors'
import { Employee, Role, User } from '@lib/types'
import { EmployeeData } from '@lib/employee'

export const getUsers = async (): Promise<User[]> => {
  return await $authHost.get(`/api/admin/get`).then((res) => res.data)
}

export const addAdmin = async (id: string): Promise<User> => {
  return await $authHost
    .patch(`/api/admin/edit?profileId=${id}`)
    .then((res) => res.data)
}

export const createAdmin = async (admin: EmployeeData): Promise<Employee> => {
  return await $authHost
    .post(`/api/employee/create`, { ...admin, role: Role.ADMIN })
    .then((res) => res.data)
}

export const removeAdmin = async (id: string): Promise<User> => {
  return await $authHost
    .delete(`/api/admin/delete?profileId=${id}`)
    .then((res) => res.data)
}
