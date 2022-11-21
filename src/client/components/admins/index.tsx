import { useEffect, useState } from 'react'
import { getAdmins } from '@lib/admin'
import { Admin } from '@lib/types'
import AdminItem from '@components/admins/AdminItem'

const Admins = () => {
  const [admins, setAdmins] = useState<Admin[]>([])

  const getAdminUsers = async () => {
    const adminsData = await getAdmins()
    if (adminsData) {
      setAdmins(adminsData)
    }
  }
  useEffect(() => {
    void getAdminUsers()
  }, [])
  return (
    <div>
      {admins?.map((it, idx) => (
        <AdminItem key={it.id} admin={it} idx={idx} />
      ))}
    </div>
  )
}

export default Admins
