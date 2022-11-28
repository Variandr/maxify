import { Product } from '@lib/types'
import { $authHost } from '@lib/interceptors'
import { Category } from '../../test/seed/data'

export const getCategoriesByOrganizationId = async (): Promise<Product[]> => {
  return await $authHost.get('/api/category/get').then((res) => res.data)
}

export const addCategory = async (name: string): Promise<Product> => {
  return await $authHost
    .post('/api/product/create', { name })
    .then((res) => res.data)
}

export const editCategory = async (
  id: string,
  category: Category
): Promise<Product> => {
  return await $authHost
    .patch(`/api/product/edit?categoryId=${id}`, category)
    .then((res) => res.data)
}

export const deleteCategory = async (id: string): Promise<string> => {
  return await $authHost.delete(`/api/product/delete?categoryId=${id}`)
}
