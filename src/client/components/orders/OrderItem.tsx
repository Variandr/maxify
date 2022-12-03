import React, { useState } from 'react'
import { Order, Role } from '@lib/types'
import classnames from 'classnames'
import Image from 'next/image'
import EditIcon from '@assets/edit.svg'
import DeleteIcon from '@assets/delete.svg'
import { Client } from '../../../test/seed/data'

interface Props {
  client: Client | undefined
  order: Order
  index: number
  removeOrder: (orderId: string) => Promise<void>
  setEditOrder: (order: Order) => void
  role?: Role
}

const OrderItem = ({
  client,
  removeOrder,
  setEditOrder,
  order,
  role,
  index,
}: Props) => {
  const [isVisible, setVisible] = useState(false)
  const deliveryStatus = order.deliveryStatus.split('_').join(' ').toLowerCase()

  return (
    <div
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      className={classnames('flex px-4 py-3 gap-5 text-xl', {
        'bg-zinc-50 dark:bg-zinc-900': index % 2 === 0,
        'bg-zinc-100 dark:bg-zinc-900/50': index % 2 !== 0,
      })}
    >
      <p className="w-3/12">{client?.name}</p>
      <p className="w-2/12">{order.status.toLowerCase()}</p>
      <p className="w-3/12">{deliveryStatus}</p>
      <p className="w-2/12">{order.discount ? order.discount : 0}</p>
      <p className="w-2/12">{order.totalPrice}</p>
      {Role.USER !== role && isVisible && (
        <div className="flex gap-2 items-end absolute right-10">
          <div className="hover:scale-110 duration-300">
            <Image
              onClick={() => setEditOrder(order)}
              src={EditIcon}
              width={20}
              height={20}
              alt="edit employee"
              className="dark:invert cursor-pointer"
            />
          </div>

          <div className="hover:scale-110 duration-300">
            <Image
              onClick={() => removeOrder(order.id)}
              src={DeleteIcon}
              width={20}
              height={20}
              alt="remove employee"
              className="dark:invert cursor-pointer"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default OrderItem
