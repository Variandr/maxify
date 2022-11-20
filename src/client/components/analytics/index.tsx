import { Income, Order } from '@lib/types'
import { useMemo } from 'react'
import { Chart } from 'react-chartjs-2'
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from 'chart.js'
import LinePercentageChart from '@components/analytics/LinePercentageChart'
import { labels } from '@components/analytics/data'

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
}

const Analytics = ({ incomes, orders }: Props) => {
  const sortedIncomes = useMemo(
    () =>
      incomes?.sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      }),
    [incomes]
  )
  let months = {
    January: 0,
    February: 0,
    March: 0,
    April: 0,
    May: 0,
    June: 0,
    July: 0,
    August: 0,
    September: 0,
    October: 0,
    November: 0,
    December: 0,
  }
  const sortedOrders = Object.fromEntries(
    useMemo(() => {
      orders?.map((it) => {
        months[
          new Date(it.createdAt).toLocaleString('default', {
            month: 'long',
          }) as keyof typeof months
        ]++
        return it
      })
      return Object.entries(months).filter(([key, _]) => {
        return (
          Number(
            new Date(`${key} 01 2000`).toLocaleDateString(`en`, {
              month: `numeric`,
            })
          ) <= Number(new Date().toLocaleDateString(`en`, { month: `numeric` }))
        )
      })
    }, [orders])
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
      <div className="flex flex-col gap-5">
        {incomesData && incomesData.length > 0 && (
          <LinePercentageChart
            incomesData={incomesData}
            value={incomesData?.[incomesData.length - 1] + '$'}
            name="Revenue"
          />
        )}
        {sortedOrders && Object.values(sortedOrders).length > 0 && (
          <LinePercentageChart
            label={Object.keys(sortedOrders)}
            incomesData={Object.values(sortedOrders)}
            value={Object.values(sortedOrders)[
              Object.values(sortedOrders).length - 1
            ]!.toString()}
            name="Orders"
          />
        )}
      </div>
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
