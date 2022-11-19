import React from 'react'
import Image from 'next/image'
import ProfileTest from '@assets/profileTest.jpg'
import classnames from 'classnames'
import { Profile } from '@lib/types'

interface Props {
  profile: Profile
}

const ProfileData = ({ profile }: Props) => {
  return (
    <div className="flex flex-col items-center">
      <div className="relative flex items-center">
        <Image
          src={ProfileTest}
          alt="profile photo"
          height={250}
          width={250}
          objectFit="cover"
          className={classnames('relative rounded', {
            'dark:invert rounded-full': profile.avatarUrl,
          })}
        />
        <p
          className={classnames(
            'absolute inset-0 text-white bg-black/70 text-center flex flex-col items-center justify-center opacity-0 hover:opacity-100 bg-opacity-90 duration-300 cursor-pointer',
            {
              rounded: profile.avatarUrl,
              'rounded-full': profile.avatarUrl,
            }
          )}
        >
          Change photo
        </p>
      </div>
      <p className="mt-2 text-2xl">
        {profile?.name} {profile?.surname}
      </p>
      <p className="text-gray-800 dark:invert">{profile.email}</p>
    </div>
  )
}

export default ProfileData
