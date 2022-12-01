import { Order } from '@lib/types'
import { $authHost } from '@lib/interceptors'

export const getOrdersByOrganizationId = async (
  orgId: string
): Promise<Order[]> => {
  return await $authHost
    .get(`/api/order/get?organizationId=${orgId}`)
    .then((res) => res.data)
}

export const createOrder = async (
  organizationId: string,
  order: Order
): Promise<Order> => {
  return await $authHost
    .post(`/api/order/create?organizationId=${organizationId}`, order)
    .then((res) => res.data)
}

export const editOrder = async (order: Order): Promise<Order> => {
  return await $authHost
    .patch(`/api/order/edit?orderId=${order.id}`, order)
    .then((res) => res.data)
}

export const deleteOrder = async (orderId: string): Promise<Order> => {
  return await $authHost
    .delete(`/api/order/delete?orderId=${orderId}`)
    .then((res) => res.data.order)
}
