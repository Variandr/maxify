import axios from 'axios'
import { setAuthStatus, setProfile } from '@store/actions/profile'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'

const Logout = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const logout = async () => {
    try {
      const data = await axios.post('/api/auth/logout').then((res) => res.data)
      if (data.success) {
        dispatch(setProfile(null))
        dispatch(setAuthStatus(false))
      }
    } catch {
      await router.back()
    }
  }

  useEffect(() => {
    logout()
  }, [])

  return (
    <div className="w-screen h-screen flex dark:bg-black/95 text-2xl font-bold bg-white justify-center items-center">
      You are successfully logout!
    </div>
  )
}
export default Logout
