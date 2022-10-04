import React from 'react'
import Account from '@assets/account.svg'
import Image from 'next/image'
import { Modal } from '@lib/types/modals'

interface Props {
  activeModal?: Modal
}

const Header = ({ activeModal }: Props) => {
  return (
    <div className=" flex justify-between items-center shadow-lg dark:bg-black/90 z-10 flex py-4 px-6">
      <p className="font-bold text-xl">{activeModal ?? 'Dashboard'}</p>
      <div className="flex items-center">
        <Image
          src={Account}
          alt="user account"
          width={30}
          height={30}
          className="cursor-pointer dark:invert"
        />
      </div>
    </div>
  )
}

export default Header
