import { useEffect, useState } from 'react'
import { Organization } from '@lib/types'
import {
  getOrganizations,
  removeOrganization,
  updateOrganization,
} from '@lib/organization'
import OrganizationItem from '@components/organizations/OrganizationItem'
import EditOrganization, {
  OrganizationForm,
} from '@components/organizations/EditOrganization'

const Organizations = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([])
  const [currentOrganization, setOrganization] = useState<Organization>()

  const setupOrganizations = async () => {
    const organizationsData = await getOrganizations()
    if (organizationsData) setOrganizations(organizationsData)
  }

  const editOrganization = async (
    organization: OrganizationForm,
    id: string
  ) => {
    const updatedOrganization = await updateOrganization(organization, id)
    if (updatedOrganization) {
      const updatedOrganizations = organizations.map((it) => {
        if (it.id === updatedOrganization.id) {
          return updatedOrganization
        } else {
          return it
        }
      })
      setOrganizations(updatedOrganizations)
    }
  }

  const deleteOrganization = async (id: string) => {
    const removedOrganization = await removeOrganization(id)
    if (removedOrganization) {
      const updatedOrganizations = organizations.filter(
        (it) => it.id !== removedOrganization.id
      )
      setOrganizations(updatedOrganizations)
    }
  }

  useEffect(() => {
    void setupOrganizations()
  }, [])

  return (
    <div>
      <div>
        {organizations &&
          organizations.length > 0 &&
          organizations.map((it, idx) => (
            <OrganizationItem
              key={it.id}
              organization={it}
              idx={idx}
              deleteOrganization={deleteOrganization}
              editOrganization={setOrganization}
            />
          ))}
      </div>
      <div className="mt-8 cursor-pointer mx-auto text-center w-48 ease-in duration-200 text-white py-3 px-6 font-bold text-md rounded-xl bg-green-500 hover:bg-green-600 dark:bg-green-700 dark:hover:bg-green-600">
        Add organization
      </div>
      {currentOrganization && (
        <EditOrganization
          organization={currentOrganization}
          editOrganization={editOrganization}
          closeModal={() => setOrganization(undefined)}
        />
      )}
    </div>
  )
}
export default Organizations
