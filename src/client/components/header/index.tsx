import React, { Fragment } from 'react'
import Account from '@assets/account.svg'
import Image from 'next/image'
import { Modal, userModals } from '@lib/types/modals'
import { Menu, Transition } from '@headlessui/react'

interface Props {
  activeModal?: Modal
  setModal: (modal: Modal) => void
}

const LOGOUT_URL = '/logout'

const Header = ({ activeModal, setModal }: Props) => {
  return (
    <div className="flex justify-between items-center shadow-lg dark:bg-black/90 z-10 flex py-4 px-6">
      <p className="font-bold text-xl">{activeModal ?? 'Dashboard'}</p>
      <Menu>
        <div>
          <Menu.Button>
            <div className="flex items-center justify-center">
              <Image
                src={Account}
                alt="user account"
                width={30}
                height={30}
                className="cursor-pointer dark:invert"
              />
            </div>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            className="bg-white dark:bg-neutral-800 absolute rounded-md right-4 top-20"
            style={{ boxShadow: '0px 0px 12px rgba(61, 55, 61, 0.7)' }}
          >
            <div className="px-6 py-2 flex flex-col">
              {userModals?.map((it) => (
                <Menu.Item key={it.name} as={Fragment}>
                  <a
                    onClick={() => setModal(it.name)}
                    className="hover:text-amber-400 cursor-pointer"
                  >
                    {it.name}
                  </a>
                </Menu.Item>
              ))}
              <a
                href={LOGOUT_URL}
                className="hover:text-amber-400 cursor-pointer"
              >
                Logout
              </a>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}

export default Header
