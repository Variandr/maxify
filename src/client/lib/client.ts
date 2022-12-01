import { $authHost } from '@lib/interceptors'
import { Client } from '../../test/seed/data'

export const getAllClients = async (): Promise<Client[]> => {
  return await $authHost.get('/api/client/get').then((res) => res.data)
}
