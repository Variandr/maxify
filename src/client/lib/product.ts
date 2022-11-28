import { Product } from '@lib/types'
import { $authHost } from '@lib/interceptors'
import { AddProductForm } from '@components/products/AddProduct'

export const getProductsByOrganizationId = async (
  orgId: string
): Promise<Product[]> => {
  return await $authHost
    .get(`/api/product/get?organizationId=${orgId}`)
    .then((res) => res.data)
}

export const createProduct = async (
  organizationId: string,
  product: AddProductForm
): Promise<Product> => {
  return await $authHost
    .post(`/api/product/create?organizationId=${organizationId}`, product)
    .then((res) => res.data)
}

export const editProduct = async (product: Product): Promise<Product> => {
  return await $authHost
    .patch(`/api/product/edit?productId=${product.id}`, product)
    .then((res) => res.data)
}

export const deleteProduct = async (productId: string): Promise<Product> => {
  return await $authHost
    .delete(`/api/product/delete?productId=${productId}`)
    .then((res) => res.data.product)
}
