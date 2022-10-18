import React, { Fragment } from 'react'
import Account from '@assets/account.svg'
import Image from 'next/image'
import { Modal } from '@lib/types/modals'
import { Menu, Transition } from '@headlessui/react'

interface Props {
  activeModal?: Modal
}

const links = [
  { href: '/settings', label: 'Settings' },
  { href: '/profile', label: 'Profile' },
  { href: '/logout', label: 'Logout' },
]

const Header = ({ activeModal }: Props) => {
  return (
    <div className="flex justify-between items-center shadow-lg dark:bg-black/90 z-10 flex py-4 px-6">
      <p className="font-bold text-xl">{activeModal ?? 'Dashboard'}</p>
      <Menu>
        <div>
          <Menu.Button>
            <div className="flex items-center">
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
          <Menu.Items className="dark:bg-neutral-800 absolute rounded-md shadow-xl right-4 top-20">
            <div className="px-6 py-2 flex flex-col">
              {links.map((link) => (
                <Menu.Item key={link.href} as={Fragment}>
                  {({ active }) => (
                    <a
                      href={link.href}
                      className={`${active && 'text-amber-400'}`}
                    >
                      {link.label}
                    </a>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}

export default Header
