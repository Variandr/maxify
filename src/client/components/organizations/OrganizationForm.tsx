import { Organization } from '@lib/types'
import * as yup from 'yup'
import classnames from 'classnames'

interface Props {
  organization?: Organization
  formData: any
  onSubmit: (formData: OrganizationFormI) => void
}

export interface OrganizationFormI {
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

const OrganizationForm = ({ organization, formData, onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = formData

  return (
    <form
      className="mt-10 p-10 gap-5 justify-between flex flex-wrap flex-row"
      onSubmit={handleSubmit(onSubmit)}
    >
      {organization && (
        <div className="font-bold text-3xl w-full text-center">
          {organization.name}
        </div>
      )}

      <div className="flex flex-col">
        <label className="text-gray-600 font-medium">Name</label>
        <input
          className="border-solid border-b-2 outline-0 py-2 px-4 w-full text-gray-700"
          placeholder="Company name"
          {...register('name')}
        />
        {errors.name && (
          <p className="text-red-600 text-sm">{errors.name?.message}</p>
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
          <p className="text-red-600 text-sm">{errors.description?.message}</p>
        )}
      </div>

      <div className="flex flex-col">
        <label className="text-gray-600 font-medium">Total Income</label>
        <input
          className="border-solid border-b-2 outline-0 py-2 px-4 w-full text-gray-700"
          placeholder="Income"
          type="number"
          {...register('totalIncome')}
        />
        {errors.totalIncome && (
          <p className="text-red-600 text-sm">{errors.totalIncome?.message}</p>
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
  )
}
export default OrganizationForm
