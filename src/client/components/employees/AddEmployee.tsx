import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import classnames from 'classnames'
import Image from 'next/image'
import ArrowLeft from '@assets/arrow-left.svg'
import getProfile from '@lib/get-profile'
import addEmployee from '@lib/add-employee'
import { useState } from 'react'
import { Employee } from '@lib/types'

interface Props {
  closeModal: () => void
  organizationId: string
  setEmployees: (employee: Employee[]) => void
  employees?: Employee[]
}

export interface AddEmployeeForm {
  position: string
  salary: number
  email: string
  name: string
  password: string
  surname?: string
}

const schema = yup
  .object({
    position: yup.string().required(),
    salary: yup.number().required(),
    email: yup.string().email().required(),
    name: yup.string().required(),
    password: yup.string().required(),
    surname: yup.string(),
  })
  .required()

const AddEmployee = ({
  closeModal,
  organizationId,
  setEmployees,
  employees,
}: Props) => {
  const [emailAlreadyExists, setEmailAlreadyExists] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<AddEmployeeForm>({
    resolver: yupResolver(schema),
    mode: 'all',
  })

  const onSubmit = async (formData: AddEmployeeForm) => {
    setEmailAlreadyExists('')
    const profile = await getProfile(formData.email)
    if (profile) {
      setEmailAlreadyExists(
        'Account with this email already exists. Try another one'
      )
    } else {
      const employee = await addEmployee({ ...formData, organizationId })

      if (employee) {
        setEmployees(employees ? [...employees, employee] : [employee])
        closeModal()
      }
    }
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
          <div className="flex flex-col">
            <label className="text-gray-600 font-medium">Email</label>
            <input
              className="border-solid border-b-2 outline-0 py-2 px-4 text-gray-700"
              placeholder="Type new email"
              {...register('email')}
            />
            {errors.email && (
              <p className={'text-red-600 text-sm'}>{errors.email?.message}</p>
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
              <p className={'text-red-600 text-sm'}>
                {errors.password?.message}
              </p>
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
              <p className={'text-red-600 text-sm'}>{errors.name?.message}</p>
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
              <p className={'text-red-600 text-sm'}>
                {errors.surname?.message}
              </p>
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
              <p className={'text-red-600 text-sm'}>
                {errors.position?.message}
              </p>
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
              <p className={'text-red-600 text-sm'}>{errors.salary?.message}</p>
            )}
          </div>

          {emailAlreadyExists && (
            <p className={'text-red-600 text-sm'}>{emailAlreadyExists}</p>
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
            Add employee
          </button>
        </form>
      </div>
    </div>
  )
}
export default AddEmployee
