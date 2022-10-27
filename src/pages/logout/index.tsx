import axios from 'axios'
import { setAuthStatus, setProfile } from '@store/actions/profile'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import useDarkMode from '@lib/use-dark-mode'

const Logout = () => {
  useDarkMode()
  const router = useRouter()
  const dispatch = useDispatch()
  const logout = async () => {
    try {
      const data = await axios.post('/api/auth/logout').then((res) => res.data)
      if (data.success) {
        dispatch(setProfile(null))
        dispatch(setAuthStatus(false))
        localStorage.removeItem('access_token')
      }
    } catch {
      await router.back()
    }
  }

  useEffect(() => {
    logout()
  }, [])

  return (
    <div className="w-screen h-screen flex flex-col dark:bg-black/95 dark:text-neutral-100 text-2xl font-bold bg-white justify-center items-center">
      <div>You are successfully logout!</div>
      <button
        className="py-1 px-4 m-5 bg-zinc-300 dark:bg-neutral-800 hover:dark:bg-neutral-700 hover:bg-zinc-400 rounded-lg"
        onClick={() => router.back()}
      >
        Return
      </button>
    </div>
  )
}
export default Logout
