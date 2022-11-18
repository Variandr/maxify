import MainSection from '@components/profile/MainSection'
import InfoSection from '@components/profile/InfoSection'
import { ProfileType } from '@lib/types'
import { $authHost } from '@lib/interceptors'
import { useEffect, useState } from 'react'
import { Modal } from '@lib/types/modals'

interface Props {
  profileEmail?: string
  setModal: (modal: Modal) => void
}
const Profile = ({ profileEmail, setModal }: Props) => {
  const [profileInfo, setProfileInfo] = useState<ProfileType | null>(null)
  const getProfileInfo = async (): Promise<{ profile: ProfileType }> => {
    return await $authHost
      .get(`/api/profile/get?email=${profileEmail}`)
      .then((res) => res.data)
  }

  useEffect(() => {
    getProfileInfo().then((data) => setProfileInfo(data.profile))
  }, [])

  return (
    <div className="flex px-10 py-8">
      <MainSection />
      <InfoSection profileInfo={profileInfo} setModal={setModal} />
    </div>
  )
}

export default Profile
