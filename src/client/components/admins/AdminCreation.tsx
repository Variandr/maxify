import Image from 'next/image'
import ArrowLeft from '@assets/arrow-left.svg'
import * as yup from 'yup'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import getProfile from '@lib/get-profile'
import classnames from 'classnames'
import { AddEmployeeForm, schema } from '@components/employees/AddEmployee'
import { EmployeeData } from '@lib/employee'
import { ErrorMessage } from '@lib/types/api'
import { Organization } from '@lib/types'
import { getOrganizations } from '@lib/organization'

interface Props {
  closeModal: () => void
  addNewAdmin: (admin: EmployeeData) => void
}

const adminSchema = schema
  .concat(
    yup.object().shape({
      organizationId: yup.string().required(),
    })
  )
  .required()

interface AdminForm extends AddEmployeeForm {
  organizationId: string
}

const AdminCreation = ({ closeModal, addNewAdmin }: Props) => {
  const [organizations, setOrganizations] = useState<Organization[]>([])
  const [emailAlreadyExists, setEmailAlreadyExists] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<AdminForm>({
    resolver: yupResolver(adminSchema),
    mode: 'all',
  })

  const onSubmit = async (formData: AdminForm) => {
    setEmailAlreadyExists('')
    const profile = await getProfile(formData.email)
    if (profile) {
      setEmailAlreadyExists(ErrorMessage.ALREADY_EXISTS)
    } else {
      await addNewAdmin(formData)
      closeModal()
    }
  }

  const getOrganizationsData = async () => {
    const organizationsData = await getOrganizations()
    if (organizationsData) setOrganizations(organizationsData)
  }

  useEffect(() => {
    void getOrganizationsData()
  }, [])

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
          <div className="flex flex-col">
            <label className="text-gray-600 font-medium">Email</label>
            <input
              className="border-solid border-b-2 outline-0 py-2 px-4 text-gray-700"
              placeholder="Type new email"
              {...register('email')}
            />
            {errors.email && (
              <p className="text-red-600 text-sm">{errors.email?.message}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600 font-medium">Password</label>
            <input
              className="border-solid border-b-2 outline-0 py-2 px-4 text-gray-700"
              placeholder="Type password"
              {...register('password')}
            />
            {errors.password && (
              <p className="text-red-600 text-sm">{errors.password?.message}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600 font-medium">Name</label>
            <input
              className="border-solid border-b-2 outline-0 py-2 px-4 w-full text-gray-700"
              placeholder="Name"
              {...register('name')}
            />
            {errors.name && (
              <p className="text-red-600 text-sm">{errors.name?.message}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600 font-medium">Surname</label>
            <input
              className="border-solid border-b-2 outline-0 py-2 px-4 w-full text-gray-700"
              placeholder="Surname"
              {...register('surname')}
            />
            {errors.surname && (
              <p className="text-red-600 text-sm">{errors.surname?.message}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600 font-medium">Position</label>
            <input
              className="border-solid border-b-2 outline-0 py-2 px-4 w-full text-gray-700"
              placeholder="Ex. CEO"
              {...register('position')}
            />
            {errors.position && (
              <p className="text-red-600 text-sm">{errors.position?.message}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600 font-medium">Salary</label>
            <input
              className="border-solid border-b-2 outline-0 py-2 px-4 w-full text-gray-700"
              placeholder="Salary"
              {...register('salary')}
            />
            {errors.salary && (
              <p className="text-red-600 text-sm">{errors.salary?.message}</p>
            )}
          </div>

          {organizations && organizations.length > 0 && (
            <div className="flex flex-col">
              <label className="text-gray-600 font-medium">Organization</label>
              <select
                className="border-solid bg-white border-b-2 outline-0 py-2 px-4 w-full text-gray-700"
                {...register('organizationId')}
              >
                {organizations.map((it) => (
                  <option key={it.id} value={it.id}>
                    {it.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {emailAlreadyExists && (
            <p className="text-red-600 text-sm">{emailAlreadyExists}</p>
          )}

          <button
            className={classnames(
              'mt-9 ease-in duration-200 text-white border py-3 px-6 font-bold mx-auto text-md rounded-xl',
              { 'bg-green-500 hover:bg-green-600': isValid },
              { 'bg-green-500/50': !isValid }
            )}
            type="submit"
            disabled={!isValid}
          >
            Create Admin
          </button>
        </form>
      </div>
    </div>
  )
}
export default AdminCreation
