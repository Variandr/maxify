import { Organization } from '@lib/types'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import OrganizationForm, {
  OrganizationFormI,
  schema,
} from '@components/organizations/OrganizationForm'
import Image from 'next/image'
import ArrowLeft from '@assets/arrow-left.svg'

interface Props {
  organization: Organization
  editOrganization: (organization: OrganizationFormI, id: string) => void
  closeModal: () => void
}

const EditOrganization = ({
  organization,
  editOrganization,
  closeModal,
}: Props) => {
  const formData = useForm<OrganizationFormI>({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: {
      name: organization.name,
      description: organization.description,
      totalIncome: organization.totalIncome,
    },
  })

  const onSubmit = async (formData: OrganizationFormI) => {
    await editOrganization(formData, organization.id)
    closeModal()
  }

  return (
    <div
      onClick={closeModal}
      className="absolute z-10 top-0 left-0 flex items-center justify-center w-screen h-screen bg-white/75 dark:bg-black/75"
    >
      <div
        className="absolute shadow-xl bg-white dark:bg-black w-6/12 h-fit z-20 rounded-lg"
        onClick={(event) => event.stopPropagation()}
      >
        <button className="absolute left-5 top-5" onClick={closeModal}>
          <Image
            width={35}
            height={35}
            src={ArrowLeft}
            alt="cancel creation employee"
          />
        </button>

        <OrganizationForm
          onSubmit={onSubmit}
          organization={organization}
          formData={formData}
        />
      </div>
    </div>
  )
}
export default EditOrganization
