import { useEffect } from 'react'
import { useRouter } from 'next/router'
import useDarkMode from '@lib/use-dark-mode'

const Logout = () => {
  useDarkMode()
  const router = useRouter()

  useEffect(() => {
    localStorage.removeItem('access_token')
  }, [])

  return (
    <div className="w-screen h-screen flex flex-col dark:bg-black/95 dark:text-neutral-100 text-2xl font-bold bg-white justify-center items-center">
      <div>You are successfully logout!</div>
      <button
        className="py-1 px-4 m-5 bg-zinc-300 dark:bg-neutral-800 hover:dark:bg-neutral-700 hover:bg-zinc-400 rounded-lg"
        onClick={() => router.push('/auth')}
      >
        Return
      </button>
    </div>
  )
}
export default Logout
