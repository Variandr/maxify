import MainSection from '@components/profile/MainSection'
import InfoSection from '@components/profile/InfoSection'
import { ProfileType } from '@lib/types'
import { $authHost } from '@lib/interceptors'
import { useEffect, useState } from 'react'

const Profile = () => {
  const [profileInfo, setProfileInfo] = useState<ProfileType | null>(null)
  const getProfileInfo = async (): Promise<{ profile: ProfileType }> => {
    return await $authHost
      .get<{ profile: ProfileType }>('/api/profile/get')
      .then((res) => res.data)
  }

  useEffect(() => {
    getProfileInfo().then((data) => setProfileInfo(data.profile))
  }, [])

  return (
    <div className="flex px-10 py-8">
      <MainSection />
      <InfoSection profileInfo={profileInfo} />
    </div>
  )
}

export default Profile
