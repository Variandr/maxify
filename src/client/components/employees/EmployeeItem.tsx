import { Employee } from '@lib/types'
import Avatar from '@assets/employee-no-avatar.svg'
import Image from 'next/image'
import classnames from 'classnames'

interface Props {
  employee: Employee
  idx: number
}

const EmployeeItem = ({ employee, idx }: Props) => {
  const { profile } = employee
  const fullName = profile?.name + ' ' + (profile?.surname ?? '')
  return (
    <div
      className={classnames('flex p-5 items-center text-xl justify-center', {
        'bg-zinc-50 dark:bg-zinc-900': idx % 2 === 0,
        'bg-zinc-100 dark:bg-zinc-900/50': idx % 2 !== 0,
      })}
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
      <div className="w-2/12">{employee.salary}</div>
      <div className="w-2/12">{profile?.age}</div>
      <div className="w-2/12">{profile?.email}</div>
    </div>
  )
}
export default EmployeeItem
