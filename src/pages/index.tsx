import type { NextPage } from 'next'
import Header from '@components/ui/Header'
import Sidebar from '@components/ui/Sidebar'
import { getFeedStaticProps } from '../client/lib/feed-props'
import { useSelector } from 'react-redux'
import { RootState } from '../store/reducers'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

interface Props {
  organization: any
  income: any
  order: any
  product: any
  employee: any
}

export async function getStaticProps(context) {
  const staticProps = await getFeedStaticProps(context)
  const props = staticProps ? JSON.parse(JSON.stringify(staticProps)) : null
  return {
    props: props || {},
  }
}

const Home: NextPage = ({
  organization,
  income,
  product,
  order,
  employee,
}: Props) => {
  const isUserAuthorized = useSelector(
    (state: RootState) => state.profile.isAuth
  )
  const router = useRouter()

  useEffect(() => {
    !isUserAuthorized && router.push('/auth')
  })

  return (
    <div className="flex h-screen font-basic">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Header />
        <div className="h-full"></div>
      </div>
    </div>
  )
}

export default Home
