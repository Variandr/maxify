import React from 'react'
import Account from '../../assets/account.svg'
import Image from 'next/image'

const Header = () => {
  return (
    <div className=" flex justify-between items-center shadow-lg bg-white z-10 flex py-4 px-6">
      <p className="font-bold text-xl">Deals</p>
      <div className="flex items-center">
        <Image
          src={Account}
          alt="user account"
          width={30}
          height={30}
          className="cursor-pointer"
        />
      </div>
    </div>
  )
}

export default Header
