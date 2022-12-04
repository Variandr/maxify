import Header from '@components/header'
import Sidebar from '@components/sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@store/reducers'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Modal } from '@lib/types/modals'
import Analytics from '@components/analytics'
import Employees from '@components/employees'
import Orders from '@components/orders'
import Products from '@components/products'
import { Role } from '@lib/types'
import {
  setAuthStatus,
  setOrganization,
  setProfile,
} from '@store/actions/profile'
import { getOrganization, getProfile } from '@store/selectors/profile'
import Profile from '@components/profile'
import Settings from '@components/settings'
import { $authHost } from '@lib/interceptors'
import EditProfile from '@components/profile/EditProfile/EditProfile'
import Organizations from '@components/organizations'
import Admins from '@components/admins'

const Home = () => {
  const isUserAuthorized = useSelector(
    (state: RootState) => state.profile.isAuth
  )
  const [activeModal, setModal] = useState<Modal>()
  const router = useRouter()
  const dispatch = useDispatch()
  const profile = useSelector(getProfile)
  const organization = useSelector(getOrganization)

  const authenticateProfile = async () => {
    try {
      const profile = await $authHost
        .get('/api/auth/authenticate')
        .then((res) => res.data)
      if (profile) {
        dispatch(setProfile(profile))
        dispatch(setOrganization(profile?.employee[0]?.organization))
        dispatch(setAuthStatus(true))
        setModal(
          profile?.role === Role.OWNER ? Modal.ORGANIZATIONS : Modal.ANALYTICS
        )
      }
    } catch {
      await router.push('/auth')
    }
  }

  useEffect(() => {
    if (!isUserAuthorized) {
      void authenticateProfile()
    }
  }, [])

  if (!isUserAuthorized || !profile) {
    return null
  }

  return (
    <div className="flex h-screen font-basic bg-white dark:text-neutral-100">
      {profile.role === Role.OWNER ? (
        <>
          <Sidebar setModal={setModal} isOwner />
          <div className="flex flex-col w-full">
            <Header activeModal={activeModal} setModal={setModal} />
            <div className="h-full dark:bg-black/95 p-5">
              {activeModal === Modal.ORGANIZATIONS && <Organizations />}
              {activeModal === Modal.ADMINS && <Admins />}
            </div>
          </div>
        </>
      ) : (
        <>
          <Sidebar setModal={setModal} />
          <div className="flex flex-col w-full">
            <Header activeModal={activeModal} setModal={setModal} />
            <div className="h-full dark:bg-black/95 p-5 flex flex-col h-full">
              {activeModal === Modal.ANALYTICS && (
                <Analytics organizationId={organization?.id} />
              )}
              {activeModal === Modal.EMPLOYEES && (
                <Employees
                  role={profile.role}
                  organizationId={organization.id}
                />
              )}
              {activeModal === Modal.ORDERS && (
                <Orders organizationId={organization.id} role={profile.role} />
              )}
              {activeModal === Modal.PRODUCTS && (
                <Products
                  organizationId={organization.id}
                  role={profile.role}
                />
              )}
              {activeModal === Modal.PROFILE && (
                <Profile email={profile.email} setModal={setModal} />
              )}
              {activeModal === Modal.EDIT_PROFILE && (
                <EditProfile setModal={setModal} />
              )}
              {activeModal === Modal.SETTINGS && <Settings />}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Home
