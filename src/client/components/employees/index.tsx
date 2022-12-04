import { Employee, Role } from '@lib/types'
import EmployeeItem from './EmployeeItem'
import Image from 'next/image'
import AddUserIcon from '@assets/add-user.svg'
import React, { useEffect, useState } from 'react'
import AddEmployee from './AddEmployee'
import { getEmployeesByOrganization } from '@lib/employee'
import EditEmployee from './EditEmployee'

interface Props {
  role?: Role
  organizationId: string
}

const Employees = ({ role, organizationId }: Props) => {
  const [modal, showModal] = useState(false)
  const [employees, setEmployees] = useState<Employee[]>()
  const [editEmployee, setEditingEmployee] = useState<Employee>()

  const getEmployees = async () => {
    const employeesData = await getEmployeesByOrganization(organizationId)
    setEmployees(employeesData)
  }

  useEffect(() => {
    void getEmployees()
  }, [organizationId])

  return (
    <>
      <div className="flex flex-col h-[75vh] overflow-y-auto">
        {employees?.length && (
          <div className="flex px-5 py-3 gap-5 text-xl bg-zinc-200 dark:bg-zinc-900/50">
            <div className="w-1/12"></div>
            <div className="w-2/12">Full name</div>
            <div className="w-2/12">Position</div>
            <div className="w-1/12">Salary</div>
            <div className="w-1/12">Age</div>
            <div className="w-3/12">Email</div>
          </div>
        )}
        {employees?.map((it, idx) => (
          <EmployeeItem
            key={it.id}
            employee={it}
            idx={idx}
            role={role}
            employees={employees}
            setEmployees={setEmployees}
            setEditingEmployee={setEditingEmployee}
          />
        ))}
      </div>
      {Role.USER !== role && (
        <div className="absolute bottom-3 right-5 hover:scale-110 duration-300">
          <Image
            onClick={() => showModal(true)}
            src={AddUserIcon}
            width={60}
            height={60}
            alt="add employee"
            className="dark:invert cursor-pointer"
          />
        </div>
      )}

      {modal && (
        <AddEmployee
          closeModal={() => showModal(false)}
          organizationId={organizationId}
          employees={employees}
          setEmployees={setEmployees}
        />
      )}

      {editEmployee && (
        <EditEmployee
          closeModal={() => setEditingEmployee(undefined)}
          employees={employees}
          setEmployees={setEmployees}
          employee={editEmployee}
        />
      )}
    </>
  )
}
export default Employees
