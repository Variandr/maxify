// import ProfileDefaultIcon from '@assets/employee-no-avatar.svg'
import ProfileTest from '@assets/profileTest.jpg'
import Image from 'next/image'
import classnames from 'classnames'

const MainSection = () => {
  const profileExist = true

  return (
    <div className="flex flex-col">
      <div className="relative flex items-center">
        <Image
          src={ProfileTest}
          alt="profile photo"
          height={300}
          width={300}
          objectFit="cover"
          className={classnames('relative rounded', {
            'dark:invert rounded-full': !profileExist,
          })}
        />
        <p
          className={classnames(
            'absolute inset-0 text-white bg-black/70 text-center flex flex-col items-center justify-center opacity-0 hover:opacity-100 bg-opacity-90 duration-300 cursor-pointer',
            {
              rounded: profileExist,
              'rounded-full': !profileExist,
            }
          )}
        >
          Change photo
        </p>
      </div>

      <div className="mt-6 flex flex-col">
        <div>
          <div className="flex">
            <span className="border-b border-b-gray-400 b w-2/5 dark:border-white"></span>
            <p className="text-xs text-center text-gray-500 w-1/5 dark:text-white">
              WORK
            </p>
            <span className="border-b border-b-gray-400 b w-2/5 dark:border-white"></span>
          </div>
          <div>
            <p className="mt-4">Maxify</p>
            <p className="mt-2">Google</p>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex">
            <span className="border-b border-b-gray-400 b w-2/5 dark:border-white"></span>
            <p className="text-xs text-center text-gray-500 dark:text-white">
              HOBBIES
            </p>
            <span className="border-b border-b-gray-400 b w-2/5 dark:border-white"></span>
          </div>
          <div>
            <p className="mt-4">Guitar</p>
            <p className="mt-2">Volleyball</p>
            <p className="mt-2">Languages</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainSection
