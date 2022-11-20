import MainSection from '@components/profile/MainSection'
import InfoSection from '@components/profile/InfoSection'
import { ProfileType } from '@lib/types'
import { useEffect, useState } from 'react'
import getProfile from '@lib/get-profile'

interface Props {
  email?: string
}

const Profile = ({ email }: Props) => {
  const [profileInfo, setProfileInfo] = useState<ProfileType | null>(null)
  const getProfileByEmail = async () => {
    const profile = email ? await getProfile(email) : null
    if (profile) {
      setProfileInfo(profile)
    }
  }

  useEffect(() => {
    void getProfileByEmail()
  }, [email])

  return (
    <div className="flex px-10 py-8">
      <MainSection />
      <InfoSection profileInfo={profileInfo} />
    </div>
  )
}

export default Profile
