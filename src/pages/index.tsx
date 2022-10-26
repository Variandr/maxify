import { GetStaticPropsContext } from 'next'
import Header from '@components/header'
import Sidebar from '@components/sidebar'
import { getFeedStaticProps } from '@lib/feed-props'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@store/reducers'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Modal } from '@lib/types/modals'
import Analytics from '@components/analytics'
import Employees from '@components/employees'
import Orders from '@components/orders'
import Products from '@components/products'
import Calculator from '@components/calculator'
import Report from '@components/report'
import {
  Employee,
  Income,
  Order,
  Organization,
  Product,
  Role,
} from '@lib/types'
import { setAuthStatus, setProfile } from '@store/actions/profile'
import { getProfile } from '@store/selectors/profile'
import Profile from '@components/profile'
import Settings from '@components/settings'
import { $authHost } from '@lib/interceptors'

interface Props {
  organization: Organization
  incomes: Income[] | null
  orders: Order[] | null
  products: Product[] | null
  employees: Employee[] | null
}

export async function getStaticProps(context: GetStaticPropsContext<{}>) {
  const staticProps = await getFeedStaticProps(context)
  return staticProps ? JSON.parse(JSON.stringify(staticProps)) : null
}

const Home = ({ products, orders, employees }: Props) => {
  const isUserAuthorized = useSelector(
    (state: RootState) => state.profile.isAuth
  )
  const [activeModal, setModal] = useState<Modal | undefined>()
  const router = useRouter()
  const dispatch = useDispatch()
  const profile = useSelector(getProfile)

  const authenticateProfile = async () => {
    try {
      const profile = await $authHost
        .get('/api/auth/authenticate')
        .then((res) => res.data)
      if (profile) {
        dispatch(setProfile(profile))
        dispatch(setAuthStatus(true))
      }
    } catch {
      await router.push('/auth')
    }
  }

  useEffect(() => {
    if (!isUserAuthorized) {
      authenticateProfile()
    }
  }, [])

  if (!isUserAuthorized || !profile) {
    return null
  }

  return (
    <div className="flex h-screen font-basic bg-white dark:text-neutral-100">
      {profile.role === Role.OWNER ? (
        <>
          <Sidebar setModal={setModal} />
          <div className="flex flex-col w-full">
            <Header activeModal={activeModal} setModal={setModal} />
            <div className="h-full dark:bg-black/95 p-5">
              <div>Owner admin panel :)</div>
            </div>
          </div>
        </>
      ) : (
        <>
          <Sidebar setModal={setModal} />
          <div className="flex flex-col w-full">
            <Header activeModal={activeModal} setModal={setModal} />
            <div className="h-full dark:bg-black/95 p-5">
              {activeModal === Modal.ANALYTICS && <Analytics />}
              {activeModal === Modal.EMPLOYEES && (
                <Employees employees={employees} />
              )}
              {activeModal === Modal.ORDERS && <Orders orders={orders} />}
              {activeModal === Modal.PRODUCTS && (
                <Products products={products} />
              )}
              {activeModal === Modal.CALCULATOR && <Calculator />}
              {activeModal === Modal.REPORT && <Report />}
              {activeModal === Modal.PROFILE && <Profile />}
              {activeModal === Modal.SETTINGS && <Settings />}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Home
