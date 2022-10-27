import { ProfileType } from '@lib/types'

interface Props {
  profileInfo: ProfileType | null
}

const AboutInfo = ({ profileInfo }: Props) => {
  return (
    <div className="mt-6">
      <p className="text-gray-600 dark:text-white mb-4 text-lg">
        Contact information
      </p>
      <div className="w-6/12">
        <div className="flex">
          <p className="w-2/4">E-mail:</p>
          <p>{profileInfo?.email}</p>
        </div>

        <div className="flex mt-2">
          <p className="w-2/4">Phone:</p>
          <p>+380 00 00 0000</p>
        </div>

        <div className="flex mt-2">
          <p className="w-2/4">Address:</p>
          <p>Zelenskyi street, 14</p>
        </div>
      </div>

      <p className="text-gray-600 dark:text-white mb-4 mt-6 text-lg">
        Basic information
      </p>
      <div className="w-6/12">
        <div className="flex">
          <p className="w-2/4">Birthday:</p>
          <p>June 5, 1922</p>
        </div>

        <div className="flex mt-2">
          <p className="w-2/4">Gender:</p>
          <p>Male</p>
        </div>
      </div>
    </div>
  )
}

export default AboutInfo
