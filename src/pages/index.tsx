import type { NextPage } from 'next'
import Authorization from '../client/components/ui/Authorization'
import Header from '@components/ui/Header'
import Sidebar from '@components/ui/Sidebar'
import { getFeedStaticProps } from '../client/lib/feed-props'

interface Props {
  organization: any
  income: any
  order: any
  product: any
  employee: any
}

export async function getStaticProps(context) {
  const staticProps = await getFeedStaticProps(context)
  const props = JSON.parse(JSON.stringify(staticProps))
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
