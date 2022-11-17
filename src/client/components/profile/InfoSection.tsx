import Image from 'next/image'
import EditIcon from '@assets/edit.svg'
import LocationIcon from '@assets/location.svg'
import { Tab } from '@headlessui/react'
import classnames from 'classnames'
import AboutInfo from '@components/profile/AboutInfo'
import ExperienceInfo from '@components/profile/ExperienceInfo'
import { ProfileType } from '@lib/types'

interface Props {
  profileInfo: ProfileType | null
}
const InfoSection = ({ profileInfo }: Props) => {
  return (
    <div className="ml-24 w-full">
      <div className="flex flex-col">
        <div className="flex items-center">
          <p className="text-2xl mr-4">
            {profileInfo?.name} {profileInfo?.surname}
          </p>
          <Image
            src={LocationIcon}
            width={15}
            height={15}
            alt="location"
            className="dark:invert"
          />
          {profileInfo?.city && (
            <p className="ml-0.5 mr-5">{profileInfo.city}</p>
          )}
          <Image
            src={EditIcon}
            width={15}
            height={15}
            alt="edit name"
            className="dark:invert cursor-pointer"
          />
        </div>
        <p className="text-gray-600 dark:text-white">CEO</p>
      </div>
      <div className="mt-4">
        <Tab.Group>
          <Tab.List className="border-b-2">
            <Tab
              className={({ selected }) =>
                classnames('text-lg px-3', {
                  'text-xl border-b-2 ': selected,
                })
              }
            >
              About
            </Tab>
            <Tab
              className={({ selected }) =>
                classnames('text-lg px-3', {
                  'text-xl border-b-2': selected,
                })
              }
            >
              Experience
            </Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <AboutInfo profileInfo={profileInfo} />
            </Tab.Panel>
            <Tab.Panel>
              <ExperienceInfo profileInfo={profileInfo} />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  )
}

export default InfoSection
