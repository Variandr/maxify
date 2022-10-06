import { Employee } from '@lib/types'
import EmployeeItem from './EmployeeItem'

interface Props {
  employees: Employee[] | null
}

const Employees = ({ employees }: Props) => {
  return (
    <div className="flex flex-col">
      {employees?.map((it, idx) => (
        <EmployeeItem key={it.id} employee={it} idx={idx} />
      ))}
    </div>
  )
}
export default Employees
