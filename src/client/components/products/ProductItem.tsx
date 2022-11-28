import React, { useState } from 'react'

import { Product, Role } from '@lib/types'
import classnames from 'classnames'
import Image from 'next/image'
import EditIcon from '@assets/edit.svg'
import DeleteIcon from '@assets/delete.svg'

interface Props {
  product: Product
  index: number
  removeProduct: (productId: string) => Promise<void>
  setEditProduct: (product: Product) => void
  role?: Role
}

const ProductItem = ({
  product,
  index,
  removeProduct,
  setEditProduct,
  role,
}: Props) => {
  const [isVisible, setVisible] = useState(false)

  return (
    <div
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      className={classnames('flex px-4 py-3 gap-5 text-xl', {
        'bg-zinc-50 dark:bg-zinc-900': index % 2 === 0,
        'bg-zinc-100 dark:bg-zinc-900/50': index % 2 !== 0,
      })}
    >
      <p className="w-3/12">{product.name}</p>
      <p className="w-5/12 whitespace-nowrap overflow-hidden text-ellipsis">
        {product.description}
      </p>
      <p className="w-3/12">{product.price}</p>
      {Role.USER !== role && isVisible && (
        <div className="flex gap-2 items-end absolute right-10">
          <div className="hover:scale-110 duration-300">
            <Image
              onClick={() => setEditProduct(product)}
              src={EditIcon}
              width={20}
              height={20}
              alt="edit employee"
              className="dark:invert cursor-pointer"
            />
          </div>

          <div className="hover:scale-110 duration-300">
            <Image
              onClick={() => removeProduct(product.id)}
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

export default ProductItem
