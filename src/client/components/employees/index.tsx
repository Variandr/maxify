import { Employee, Role } from '@lib/types'
import EmployeeItem from './EmployeeItem'
import Image from 'next/image'
import AddUserIcon from '@assets/add-user.svg'

interface Props {
  employees: Employee[] | null
  role?: Role
}

const Employees = ({ employees, role }: Props) => {
  return (
    <>
      <div className="flex flex-col">
        {employees?.map((it, idx) => (
          <EmployeeItem key={it.id} employee={it} idx={idx} role={role} />
        ))}
      </div>
      {Role.USER !== role && (
        <div className="absolute bottom-2">
          <Image
            src={AddUserIcon}
            width={80}
            height={80}
            alt="add employee"
            className="dark:invert cursor-pointer"
          />
        </div>
      )}
    </>
  )
}
export default Employees
