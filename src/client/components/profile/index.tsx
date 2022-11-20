import MainSection from '@components/profile/MainSection'
import InfoSection from '@components/profile/InfoSection'
import { ProfileType } from '@lib/types'
import { useEffect, useState } from 'react'
import getProfile from '@lib/get-profile'
import { Modal } from '@lib/types/modals'

interface Props {
  email?: string
  setModal: (modal: Modal) => void
}

const Profile = ({ email, setModal }: Props) => {
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
      <InfoSection profileInfo={profileInfo} setModal={setModal} />
    </div>
  )
}

export default Profile
