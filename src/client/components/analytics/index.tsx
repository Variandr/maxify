import { Employee, Income, Order, Product } from '@lib/types'
import { useMemo } from 'react'
import { Chart } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  Filler,
} from 'chart.js'
import LinePercentageChart from '@components/analytics/LinePercentageChart'

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  Filler
)

interface Props {
  incomes: Income[] | null
  orders: Order[] | null
  products: Product[] | null
  employees: Employee[] | null
}

const labels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const Analytics = ({ incomes }: Props) => {
  const sortedIncomes = useMemo(
    () =>
      incomes?.sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      }),
    [incomes]
  )
  const incomesData = useMemo(
    () => sortedIncomes?.map((it) => it.income),
    [sortedIncomes]
  )

  const data = {
    labels,
    datasets: [
      {
        label: 'income',
        data: incomesData,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  }

  const analyticsYear = 2022

  return (
    <div className="flex flex-row gap-5 flex-wrap">
      {incomesData && incomesData.length > 0 && (
        <LinePercentageChart incomesData={incomesData} labels={labels} />
      )}
      {incomesData && incomesData.length > 0 && (
        <div className="shadow-lg rounded-lg p-5 w-7/12 hover:shadow-xl">
          <h2 className="text-xl font-semibold">Sales {analyticsYear}</h2>
          <Chart data={data} type="line" />
        </div>
      )}
    </div>
  )
}
export default Analytics
