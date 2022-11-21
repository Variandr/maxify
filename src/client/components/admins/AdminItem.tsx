import { Admin } from '@lib/types'
import classnames from 'classnames'
import Image from 'next/image'
import Avatar from '@assets/employee-no-avatar.svg'
import DeleteIcon from '@assets/delete.svg'

interface Props {
  admin: Admin
  idx: number
}

const AdminItem = ({ admin, idx }: Props) => {
  const fullName = admin?.name + ' ' + (admin?.surname ?? '')
  const employee = admin.employee[0]
  return (
    <div
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
          src={admin?.avatarUrl ?? Avatar}
          alt="avatar"
          width={50}
          height={50}
        />
      </div>
      <div className="w-2/12">{fullName}</div>
      <div className="w-2/12">{employee?.organization?.name ?? ''}</div>
      <div className="w-2/12">{employee?.position ?? ''}</div>
      <div className="w-1/12 mt-2">
        <Image
          // onClick={removeEmployee}
          src={DeleteIcon}
          width={28}
          height={28}
          alt="remove admin"
          className="dark:invert cursor-pointer"
        />
      </div>
    </div>
  )
}
export default AdminItem
