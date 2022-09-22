import type { NextPage } from 'next'
import Authorization from '../client/components/ui/Authorization'
import Header from '@components/ui/Header'
import Sidebar from '@components/ui/Sidebar'

const Home: NextPage = () => {
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
