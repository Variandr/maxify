import React from 'react'
import Image from 'next/image'
import Logo from '../../../assets/logo.svg'
import Analytics from '../../../assets/analytics.svg'
import Employees from '../../../assets/employees.svg'
import Orders from '../../../assets/orders.svg'
import Products from '../../../assets/products.svg'
import Calculator from '../../../assets/calculator.svg'
import Report from '../../../assets/report.svg'
import ThemeSwitcher from '@components/ui/ThemeSwitcher'

const Sidebar = () => {
  return (
    <aside className="w-[4rem] min-h-full bg-[#343a40] flex flex-col pt-2 items-center">
      <Image src={Logo} alt="user account" />
      <div className="flex flex-col justify-between h-full pb-5 items-center">
        <div className="flex flex-col items-center justify-center mt-6">
          <a className="flex items-center py-2 cursor-pointer ease-in duration-200 hover:bg-gray-600">
            <Image src={Analytics} alt="analytic icon" width={60} height={40} />
          </a>
          <a className="flex items-center py-2 cursor-pointer ease-in duration-200 hover:bg-gray-600">
            <Image
              src={Employees}
              alt="employees icon"
              width={60}
              height={40}
            />
          </a>
          <a className="flex items-center py-2 cursor-pointer ease-in duration-200 hover:bg-gray-600">
            <Image src={Orders} alt="orders icon" width={60} height={40} />
          </a>
          <a className="flex items-center py-2 cursor-pointer ease-in duration-200 hover:bg-gray-600">
            <Image src={Products} alt="products icon" width={65} height={45} />
          </a>
          <a className="flex items-center py-2 cursor-pointer ease-in duration-200 hover:bg-gray-600">
            <Image
              src={Calculator}
              alt="calculator icon"
              width={60}
              height={45}
            />
          </a>
          <a className="flex items-center py-2 cursor-pointer ease-in duration-200 hover:bg-gray-600">
            <Image src={Report} alt="calculator icon" width={60} height={45} />
          </a>
        </div>
        <ThemeSwitcher />
      </div>
    </aside>
  )
}

export default Sidebar
