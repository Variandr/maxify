import { ProfileType } from '@lib/types'

interface Props {
  profileInfo: ProfileType | null
}

const AboutInfo = ({ profileInfo }: Props) => {
  const dateOfBirth = profileInfo?.birthday
    ? new Date(profileInfo?.birthday).toLocaleString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null
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

        {profileInfo?.phoneNumber && (
          <div className="flex mt-2">
            <p className="w-2/4">Phone:</p>
            <p>{profileInfo?.phoneNumber}</p>
          </div>
        )}

        {profileInfo?.address && (
          <div className="flex mt-2">
            <p className="w-2/4">Address:</p>
            <p>{profileInfo?.address}</p>
          </div>
        )}
      </div>

      <p className="text-gray-600 dark:text-white mb-4 mt-6 text-lg">
        Basic information
      </p>
      <div className="w-6/12">
        {dateOfBirth && (
          <div className="flex">
            <p className="w-2/4">Birthday:</p>
            <p>{dateOfBirth}</p>
          </div>
        )}

        {profileInfo?.gender && (
          <div className="flex mt-2">
            <p className="w-2/4">Gender:</p>
            <p>{profileInfo?.gender}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AboutInfo
