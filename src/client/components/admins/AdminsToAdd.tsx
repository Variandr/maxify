import { Combobox, Transition } from '@headlessui/react'
import { User } from '@lib/types'
import { Fragment, useMemo, useState } from 'react'
import getFullName from '@lib/getFullName'
import Burger from '@assets/burger.svg'
import Success from '@assets/success.svg'
import Image from 'next/image'
import ArrowLeft from '@assets/arrow-left.svg'

interface Props {
  users: User[]
  setAdmin: (id: string) => void
  closeModal: () => void
}

const AdminsToAdd = ({ users, setAdmin, closeModal }: Props) => {
  const profiles = useMemo(
    () =>
      users.map((it) => ({
        ...it,
        fullName: getFullName(it.name, it.surname),
      })),
    [users]
  )

  const [selectedPerson, setSelectedPerson] = useState(profiles[0])
  const [query, setQuery] = useState('')

  const filteredPeople =
    query === ''
      ? profiles
      : profiles.filter((user) => {
          return user.fullName
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        })

  return (
    <div
      onClick={closeModal}
      className="absolute z-10 top-0 left-0 flex items-center justify-center w-screen h-screen bg-white/75 dark:bg-black/75"
    >
      <div
        className="absolute shadow-xl bg-white dark:bg-black w-6/12 h-2/5 z-20 rounded-lg"
        onClick={(event) => event.stopPropagation()}
      >
        <button className="absolute left-5 top-5" onClick={closeModal}>
          <Image
            width={35}
            height={35}
            src={ArrowLeft}
            alt="cancel creation employee"
          />
        </button>

        <div className="w-72 mx-auto mt-10">
          <Combobox value={selectedPerson} onChange={setSelectedPerson}>
            <div className="relative mt-1">
              <div className="w-full rounded-lg bg-white text-left shadow-md">
                <Combobox.Input
                  className="w-full py-2 pl-3 pr-10 leading-5 text-gray-900 dark:bg-gray-900 dark:text-white focus:outline-none"
                  displayValue={(person: User & { fullName: string }) =>
                    person?.fullName
                  }
                  onChange={(event) => setQuery(event.target.value)}
                />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <Image
                    src={Burger}
                    className="h-5 w-5 text-gray-400 dark:invert "
                    aria-hidden="true"
                    alt="list of users"
                  />
                </Combobox.Button>
              </div>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                afterLeave={() => setQuery('')}
              >
                <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {filteredPeople.length === 0 && query !== '' ? (
                    <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                      Nothing found.
                    </div>
                  ) : (
                    filteredPeople.map((person) => (
                      <Combobox.Option
                        key={person.id}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active ? 'bg-green-500 text-white' : 'text-gray-900'
                          }`
                        }
                        value={person}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? 'font-medium' : 'font-normal'
                              }`}
                            >
                              {person.fullName}
                            </span>
                            {selected ? (
                              <span
                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                  active ? 'text-white' : 'text-teal-600'
                                }`}
                              >
                                <Image
                                  src={Success}
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                  alt="chosen user"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Combobox.Option>
                    ))
                  )}
                </Combobox.Options>
              </Transition>
            </div>
          </Combobox>
        </div>
        <div
          onClick={() => {
            if (selectedPerson?.id) setAdmin(selectedPerson.id)
            closeModal()
          }}
          className="absolute bottom-5 -translate-x-1/2 mt-8 left-1/2 cursor-pointer mx-auto text-center w-48 ease-in duration-200 text-white py-3 px-6 font-bold text-md rounded-xl bg-green-500 hover:bg-green-600 dark:bg-green-700 dark:hover:bg-green-600"
        >
          Submit
        </div>
      </div>
    </div>
  )
}
export default AdminsToAdd
