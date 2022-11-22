import { useEffect, useMemo, useState } from 'react'
import { addAdmin, createAdmin, getUsers, removeAdmin } from '@lib/admin'
import { Role, User } from '@lib/types'
import AdminItem from '@components/admins/AdminItem'
import AdminCreation from '@components/admins/AdminCreation'
import AdminsToAdd from '@components/admins/AdminsToAdd'
import { EmployeeData } from '@lib/employee'

enum Modal {
  EXISTING = 'Existing',
  NEW = 'New',
}

const Admins = () => {
  const [profiles, setProfiles] = useState<User[]>([])
  const [modal, setModal] = useState<Modal>()
  const [menu, toggleMenu] = useState(false)

  const getAdminUsers = async () => {
    const adminsData = await getUsers()
    if (adminsData) {
      setProfiles(adminsData)
    }
  }

  const setAdmin = async (id: string) => {
    const newAdmin = await addAdmin(id)
    if (newAdmin) {
      const updatedUsers = profiles.map((it) => {
        if (it.id === newAdmin.id) {
          return { ...it, role: newAdmin.role }
        }
        return it
      })
      setProfiles(updatedUsers)
    }
  }

  const deleteAdmin = async (id: string) => {
    const removedAdmin = await removeAdmin(id)
    if (removedAdmin) {
      const updatedUsers = profiles.map((it) => {
        if (it.id === removedAdmin.id) {
          return { ...it, role: removedAdmin.role }
        }
        return it
      })
      setProfiles(updatedUsers)
    }
  }

  const addNewAdmin = async (admin: EmployeeData) => {
    const newAdmin = await createAdmin(admin)
    if (newAdmin) {
      await getAdminUsers()
    }
  }

  useEffect(() => {
    void getAdminUsers()
  }, [])

  const admins = useMemo(
    () => profiles?.filter((it) => it.role === Role.ADMIN),
    [profiles]
  )

  const users = useMemo(
    () => profiles?.filter((it) => it.role === Role.USER),
    [profiles]
  )

  return (
    <div>
      {admins &&
        admins.length > 0 &&
        admins?.map((it, idx) => (
          <AdminItem
            key={it.id}
            admin={it}
            idx={idx}
            deleteAdmin={deleteAdmin}
          />
        ))}
      <div
        onClick={() => toggleMenu(!menu)}
        className="mt-8 cursor-pointer mx-auto text-center w-48 ease-in duration-200 text-white py-3 px-6 font-bold text-md rounded-xl bg-green-500 hover:bg-green-600 dark:bg-green-700 dark:hover:bg-green-600"
      >
        Add admin
      </div>

      {menu && (
        <div className="rounded-md shadow-md w-60 text-center mx-auto mt-10 bg-white dark:bg-zinc-900">
          <div
            onClick={() => {
              setModal(Modal.EXISTING)
              toggleMenu(false)
            }}
            className="py-2 px-4 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            Existing
          </div>
          <div className="border-b-2 mx-4" />
          <div
            onClick={() => {
              setModal(Modal.NEW)
              toggleMenu(false)
            }}
            className="py-2 px-4 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            New
          </div>
        </div>
      )}

      {users && users.length > 0 && modal === Modal.EXISTING && (
        <AdminsToAdd
          users={users}
          setAdmin={setAdmin}
          closeModal={() => setModal(undefined)}
        />
      )}
      {modal === Modal.NEW && (
        <AdminCreation
          addNewAdmin={addNewAdmin}
          closeModal={() => setModal(undefined)}
        />
      )}
    </div>
  )
}

export default Admins
