import { Line } from 'react-chartjs-2'
import classnames from 'classnames'
import { useMemo } from 'react'
import { labels, percentageOptions } from '@components/analytics/data'

interface Props {
  incomesData?: number[]
  name: string
  value: string
  label?: string[]
}

const LinePercentageChart = ({ incomesData, name, value, label }: Props) => {
  const data = {
    labels: label ?? labels,
    datasets: [
      {
        data: incomesData,
      },
    ],
  }

  const percentageDif = useMemo(() => {
    if (incomesData && incomesData?.length > 1) {
      const dif =
        (incomesData[incomesData.length - 1]! * 100) /
          incomesData[incomesData.length - 2]! -
        100
      return dif === Infinity ? 1000 : !isNaN(dif) ? dif : 0
    }
    return 0
  }, [incomesData])

  console.log(incomesData)

  return (
    <div className="relative items-center shadow-md rounded-lg w-96 h-40 flex hover:shadow-lg">
      <div className="flex flex-col p-6">
        <div className="opacity-75">{name}</div>
        <div className="text-xl font-semibold">{value}</div>
        <div className="flex flex-row items-center">
          <span
            className={classnames(
              'font-semibold',
              { 'text-red-600': percentageDif <= 0 },
              { 'text-green-400 ': percentageDif > 0 }
            )}
          >
            {Math.round(Math.abs(percentageDif) * 10) / 10}%
          </span>
          <span>
            {percentageDif > 0 ? (
              <svg
                height="18"
                viewBox="0 0 512 512"
                width="18"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-green-400 mx-1"
              >
                <path d="M128.4,189.3L233.4,89c5.8-6,13.7-9,22.4-9c8.7,0,16.5,3,22.4,9l105.4,100.3c12.5,11.9,12.5,31.3,0,43.2  c-12.5,11.9-32.7,11.9-45.2,0L288,184.4v217c0,16.9-14.3,30.6-32,30.6c-17.7,0-32-13.7-32-30.6v-217l-50.4,48.2  c-12.5,11.9-32.7,11.9-45.2,0C115.9,220.6,115.9,201.3,128.4,189.3z" />
              </svg>
            ) : (
              <svg
                height="18"
                viewBox="0 0 512 512"
                width="18"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-red-600 mx-1"
              >
                <path d="M383.6,322.7L278.6,423c-5.8,6-13.7,9-22.4,9c-8.7,0-16.5-3-22.4-9L128.4,322.7c-12.5-11.9-12.5-31.3,0-43.2  c12.5-11.9,32.7-11.9,45.2,0l50.4,48.2v-217c0-16.9,14.3-30.6,32-30.6c17.7,0,32,13.7,32,30.6v217l50.4-48.2  c12.5-11.9,32.7-11.9,45.2,0C396.1,291.4,396.1,310.7,383.6,322.7z" />
              </svg>
            )}
          </span>
          <span className="text-sm opacity-75">than last month</span>
        </div>
      </div>
      <div
        className="absolute w-7/12 right-5"
        style={{
          WebkitMask: 'linear-gradient(#000, #0000)',
          mask: 'linear-gradient(#000, #0000)',
        }}
      >
        <Line data={data} options={percentageOptions} />
      </div>
    </div>
  )
}
export default LinePercentageChart
