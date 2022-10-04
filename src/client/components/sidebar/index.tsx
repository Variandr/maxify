import React from 'react'
import Image from 'next/image'
import Logo from '@assets/logo.svg'
import ThemeSwitcher from '@components/ui/ThemeSwitcher'
import { Modal, modals } from '@lib/types/modals'

interface Props {
  setModal: (modal: Modal) => void
}

const Sidebar = ({ setModal }: Props) => {
  return (
    <aside className="w-[4rem] min-h-full bg-[#343a40] flex flex-col pt-2 items-center dark:bg-black/90">
      <Image src={Logo} alt="user account" />
      <div className="flex flex-col justify-between h-full pb-5 items-center">
        <div className="flex flex-col items-center justify-center mt-6">
          {modals?.map((it) => (
            <button
              key={it.name}
              onClick={() => setModal(it.name)}
              className="flex items-center py-2 cursor-pointer ease-in duration-200 hover:bg-gray-600"
            >
              <Image src={it.url} width={60} height={40} />
            </button>
          ))}
        </div>
        <ThemeSwitcher />
      </div>
    </aside>
  )
}

export default Sidebar
