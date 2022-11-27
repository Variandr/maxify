import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import classnames from 'classnames'
import Image from 'next/image'
import ArrowLeft from '@assets/arrow-left.svg'
import { Employee } from '@lib/types'
import { editEmployee } from '@lib/employee'
import getFullName from '@lib/getFullName'

interface Props {
  closeModal: () => void
  setEmployees: (employee: Employee[]) => void
  employees?: Employee[]
  employee: Employee
}

export interface EditEmployeeForm {
  salary?: number
  position?: string
}

const schema = yup
  .object({
    position: yup.string(),
    salary: yup.number(),
  })
  .required()

const EditEmployee = ({
  closeModal,
  setEmployees,
  employees,
  employee,
}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<EditEmployeeForm>({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: {
      position: employee.position,
      salary: employee.salary,
    },
  })

  const { profile } = employee
  const fullName = getFullName(profile?.name, profile?.surname)

  const onSubmit = async (formData: EditEmployeeForm) => {
    const editedEmployee = await editEmployee({
      ...employee,
      ...(formData.position && { position: formData.position }),
      ...(formData.salary && { salary: formData.salary }),
    })

    if (editedEmployee) {
      const updatedEmployees = employees?.map((it) => {
        if (it.id === editedEmployee.id) {
          return {
            ...it,
            salary: editedEmployee.salary,
            position: editedEmployee.position,
          }
        }
        return it
      })
      setEmployees(updatedEmployees ?? [])
      closeModal()
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
          <div className="font-bold text-3xl w-full text-center">
            {fullName}
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
export default EditEmployee
