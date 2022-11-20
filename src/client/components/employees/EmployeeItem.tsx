import { Employee, Role } from '@lib/types'
import Avatar from '@assets/employee-no-avatar.svg'
import Image from 'next/image'
import classnames from 'classnames'
import EditIcon from '@assets/edit.svg'
import DeleteIcon from '@assets/delete.svg'
import { useState } from 'react'
import deleteEmployee from '@lib/delete-employee'

interface Props {
  employee: Employee
  idx: number
  role?: Role
  setEmployees: (employee: Employee[]) => void
  employees?: Employee[]
}

const EmployeeItem = ({
  employee,
  idx,
  role,
  setEmployees,
  employees,
}: Props) => {
  const { profile } = employee
  const [isVisible, setVisible] = useState(false)
  const fullName = profile?.name + ' ' + (profile?.surname ?? '')

  const removeEmployee = async () => {
    const removedEmployee = await deleteEmployee(employee.id)
    if (removedEmployee) {
      const updatedEmployees = employees
        ? employees?.filter((it) => it.id !== removedEmployee.id)
        : []
      setEmployees(updatedEmployees)
    }
  }

  return (
    <div
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      className={classnames(
        'flex px-5 py-3 gap-5 items-center text-xl justify-center',
        {
          'bg-zinc-50 dark:bg-zinc-900': idx % 2 === 0,
          'bg-zinc-100 dark:bg-zinc-900/50': idx % 2 !== 0,
        }
      )}
    >
      <div className="w-1/12">
        <Image
          className="dark:invert rounded-full"
          src={profile?.avatarUrl ?? Avatar}
          alt="avatar"
          width={50}
          height={50}
        />
      </div>
      <div className="w-2/12">{fullName}</div>
      <div className="w-2/12">{employee.position}</div>
      <div className="w-1/12">{employee.salary}</div>
      <div className="w-1/12">{profile?.age}</div>
      <div className="w-3/12">{profile?.email}</div>
      <div className="w-1/12 mt-2">
        {Role.USER !== role && isVisible && (
          <div className="flex gap-5">
            <Image
              src={EditIcon}
              width={28}
              height={28}
              alt="edit employee"
              className="dark:invert cursor-pointer"
            />
            <Image
              onClick={removeEmployee}
              src={DeleteIcon}
              width={28}
              height={28}
              alt="remove employee"
              className="dark:invert cursor-pointer"
            />
          </div>
        )}
      </div>
    </div>
  )
}
export default EmployeeItem
