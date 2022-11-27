import { Organization } from '@lib/types'
import classnames from 'classnames'
import Image from 'next/image'
import DeleteIcon from '@assets/delete.svg'
import EditIcon from '@assets/edit.svg'

interface Props {
  organization: Organization
  idx: number
  deleteOrganization: (id: string) => void
  editOrganization: (organization: Organization) => void
}

const OrganizationItem = ({
  organization,
  idx,
  deleteOrganization,
  editOrganization,
}: Props) => {
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
      <div className="w-2/12">{organization.name}</div>
      <div className="w-8/12">{organization?.description}</div>
      <div className="w-1/12">{organization.totalIncome}</div>
      <div className="w-1/12 mt-2 flex gap-5 justify-end">
        <Image
          onClick={() => editOrganization(organization)}
          src={EditIcon}
          width={28}
          height={28}
          alt="remove admin"
          className="dark:invert cursor-pointer"
        />
        <Image
          onClick={() => deleteOrganization(organization.id as string)}
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
export default OrganizationItem
