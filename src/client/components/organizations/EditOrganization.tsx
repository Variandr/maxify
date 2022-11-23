import { Organization } from '@lib/types'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Image from 'next/image'
import ArrowLeft from '@assets/arrow-left.svg'
import classnames from 'classnames'

interface Props {
  organization: Organization
  editOrganization: (organization: OrganizationForm, id: string) => void
  closeModal: () => void
}

export interface OrganizationForm {
  name: string
  description?: string | null
  totalIncome: number
}

export const schema = yup
  .object({
    name: yup.string().required(),
    totalIncome: yup.number().required(),
    description: yup.string(),
  })
  .required()

const EditOrganization = ({
  organization,
  editOrganization,
  closeModal,
}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<OrganizationForm>({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: {
      name: organization.name,
      description: organization.description,
      totalIncome: organization.totalIncome,
    },
  })

  const onSubmit = async (formData: OrganizationForm) => {
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

        <form
          className="mt-10 p-10 gap-5 justify-between flex flex-wrap flex-row"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="font-bold text-3xl w-full text-center">
            {organization.name}
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600 font-medium">Name</label>
            <input
              className="border-solid border-b-2 outline-0 py-2 px-4 w-full text-gray-700"
              placeholder="Company name"
              {...register('name')}
            />
            {errors.name && (
              <p className={'text-red-600 text-sm'}>{errors.name?.message}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600 font-medium">Description</label>
            <input
              className="border-solid border-b-2 outline-0 py-2 px-4 w-full text-gray-700"
              placeholder="(Optional)"
              {...register('description')}
            />
            {errors.description && (
              <p className={'text-red-600 text-sm'}>
                {errors.description?.message}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600 font-medium">Description</label>
            <input
              className="border-solid border-b-2 outline-0 py-2 px-4 w-full text-gray-700"
              placeholder="Income"
              type="number"
              {...register('totalIncome')}
            />
            {errors.totalIncome && (
              <p className={'text-red-600 text-sm'}>
                {errors.totalIncome?.message}
              </p>
            )}
          </div>

          <button
            className={classnames(
              'mt-9 ease-in duration-200 text-white border py-3 px-6 font-bold mx-auto text-md rounded-xl',
              { 'bg-green-500 hover:bg-green-600': isValid },
              { 'bg-green-500/50': !isValid }
            )}
            type="submit"
            disabled={!isValid}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}
export default EditOrganization
