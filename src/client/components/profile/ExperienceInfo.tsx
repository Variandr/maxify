import { ProfileType } from '@lib/types'

interface Props {
  profileInfo: ProfileType | null
}

const ExperienceInfo = ({ profileInfo }: Props) => {
  const employeeInfo = profileInfo?.employee
  return (
    <div className="flex mt-4">
      {employeeInfo?.map((it) => (
        <div className="rounded border mr-3 p-4" key={it?.id}>
          {it?.position}
        </div>
      ))}
    </div>
  )
}

export default ExperienceInfo
