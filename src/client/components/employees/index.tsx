import { Employee, Role } from '@lib/types'
import EmployeeItem from './EmployeeItem'
import Image from 'next/image'
import AddUserIcon from '@assets/add-user.svg'
import { useEffect, useState } from 'react'
import AddEmployee from '@components/employees/AddEmployee'
import getEmployeesByOrganization from '@lib/get-employees-by-organization'

interface Props {
  role?: Role
  organizationId: string
}

const Employees = ({ role, organizationId }: Props) => {
  const [isVisible, showModal] = useState(false)
  const [employees, setEmployees] = useState<Employee[]>()

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
        {employees?.map((it, idx) => (
          <EmployeeItem
            key={it.id}
            employee={it}
            idx={idx}
            role={role}
            employees={employees}
            setEmployees={setEmployees}
          />
        ))}
      </div>
      {Role.USER !== role && (
        <div className="absolute bottom-2">
          <Image
            onClick={() => showModal(!isVisible)}
            src={AddUserIcon}
            width={80}
            height={80}
            alt="add employee"
            className="dark:invert cursor-pointer"
          />
        </div>
      )}

      {isVisible && (
        <AddEmployee
          closeModal={() => showModal(false)}
          organizationId={organizationId}
          employees={employees}
          setEmployees={setEmployees}
        />
      )}
    </>
  )
}
export default Employees
