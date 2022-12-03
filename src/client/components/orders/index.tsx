import { Order, Product, Role } from '@lib/types'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import AddIcon from '@assets/add-product.svg'
import { deleteOrder, getOrdersByOrganizationId } from '@lib/order'
import OrderItem from '@components/orders/OrderItem'
import { Client } from '../../../test/seed/data'
import { getAllClients } from '@lib/client'
import AddOrder from '@components/orders/AddOrder'
import { getProductsByOrganizationId } from '@lib/product'
import EditOrder from '@components/orders/EditOrder'

interface Props {
  organizationId: string
  role?: Role
}

const Orders = ({ organizationId, role }: Props) => {
  const [orders, setOrders] = useState<Order[]>()
  const [clients, setClients] = useState<Client[]>()
  const [products, setProducts] = useState<Product[]>()
  const [addOrderModal, showAddOrderModal] = useState(false)
  const [editOrder, setEditOrder] = useState<Order>()

  const getOrders = async () => {
    const ordersData = await getOrdersByOrganizationId(organizationId)
    setOrders(ordersData)
  }

  const getClients = async () => {
    const clientsData = await getAllClients()
    setClients(clientsData)
  }

  const getProducts = async () => {
    const productsData = await getProductsByOrganizationId(organizationId)
    setProducts(productsData)
  }

  useEffect(() => {
    void getOrders()
    void getClients()
    void getProducts()
  }, [organizationId])

  const removeOrder = async (orderId: string) => {
    const removedOrder = await deleteOrder(orderId)
    if (removedOrder) {
      setOrders(orders?.filter((it: Order) => it.id !== removedOrder.id))
    }
  }

  return (
    <>
      <div className="flex flex-col h-[75vh] overflow-y-hidden rounded">
        {orders?.length && (
          <div className="flex px-4 py-3 gap-5 text-xl bg-zinc-200 dark:bg-zinc-900/50">
            <p className="w-3/12">Client</p>
            <p className="w-2/12">Status</p>
            <p className="w-3/12">Delivery Status</p>
            <p className="w-2/12">Discount</p>
            <p className="w-2/12">Total price ₴</p>
          </div>
        )}
        {orders?.length ? (
          orders?.map((it, index) => (
            <OrderItem
              key={it.id}
              client={clients?.find(
                (client: Client) => client.id === it.clientId
              )}
              order={it}
              index={index}
              removeOrder={removeOrder}
              setEditOrder={setEditOrder}
              role={role}
            />
          ))
        ) : (
          <p className="text-center">
            The order list is empty. You can add new ones
          </p>
        )}
      </div>

      {Role.USER !== role && (
        <div className="absolute bottom-3 right-5 hover:scale-110 duration-300">
          <Image
            onClick={() => showAddOrderModal(true)}
            src={AddIcon}
            width={50}
            height={50}
            alt="add product"
            className="dark:invert cursor-pointer"
          />
        </div>
      )}

      {addOrderModal && (
        <AddOrder
          organizationId={organizationId}
          closeModal={() => showAddOrderModal(false)}
          orders={orders}
          clients={clients}
          setOrders={setOrders}
          products={products}
        />
      )}

      {editOrder && (
        <EditOrder
          setOrders={setOrders}
          products={products}
          orders={orders}
          clients={clients}
          order={editOrder}
          closeModal={() => setEditOrder(undefined)}
        />
      )}
    </>
  )
}
export default Orders
