import React, { Dispatch, SetStateAction, useState } from 'react'
import ErrorMessage from '@components/orders/components/ErrorMessage'
import { OrderProductsData, Product } from '@lib/types'

interface Props {
  products: Product[] | undefined
  errors: any
  orderProducts: OrderProductsData[]
  setOrderProducts: Dispatch<SetStateAction<OrderProductsData[]>>
}
const OrderProducts = ({
  products,
  errors,
  setOrderProducts,
  orderProducts,
}: Props) => {
  const [availableProducts, setAvailableProducts] = useState<Product[]>(
    products as Product[]
  )
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([])
  const addProductToCart = (product: Product) => {
    setAvailableProducts(availableProducts.filter((it) => it.id !== product.id))
    setSelectedProducts([...(selectedProducts as Product[]), product])
    setOrderProducts([
      ...orderProducts,
      {
        productId: product.id,
        quantity: 1,
      },
    ])
  }

  const removeProductFromCart = (product: Product) => {
    setSelectedProducts(selectedProducts?.filter((it) => it.id !== product.id))
    setAvailableProducts([...(availableProducts as Product[]), product])
    setOrderProducts(orderProducts.filter((it) => it.productId !== product.id))
  }

  function increaseCartQuantity(id: string, e: any) {
    e.preventDefault()
    setOrderProducts((currItems) => {
      return currItems.map((item) => {
        return item.productId === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      })
    })
  }

  function decreaseCartQuantity(id: string, e: any) {
    e.preventDefault()
    if (orderProducts.find((item) => item.productId === id)?.quantity === 1) {
      // @ts-ignore
      return removeProductFromCart(products?.find((it) => it.id === id))
    } else {
      setOrderProducts([
        ...orderProducts.map((item) => {
          return item.productId === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        }),
      ])
    }
  }

  return (
    <div className="flex flex-col w-[45%]">
      <div>
        <p className="font-medium text-center">Available products</p>
        <div className="h-fit overflow-y-auto h-[100px] scrollbar-hide">
          {availableProducts?.map((it) => (
            <div key={it.id} className="flex justify-between">
              {it.name}
              <button onClick={() => addProductToCart(it)}>Add product</button>
            </div>
          ))}

          <ErrorMessage error={errors.productId} />
        </div>
      </div>

      <div className="mt-1">
        <p className="font-medium text-center">Selected products</p>
        <div className="h-fit overflow-y-auto h-[100px] scrollbar-hide">
          {selectedProducts?.map((it) => (
            <div key={it.id} className="flex justify-between items-center mb-1">
              <p className="w-1/3">{it.name}</p>
              <div className="flex items-center">
                <button
                  className="text-xl hover:scale-110 duration-300 "
                  onClick={(e) => increaseCartQuantity(it.id, e)}
                >
                  +
                </button>
                <p className="mx-1 w-[25px] text-center border-[1px] border-black dark:border-white rounded-full m-0">
                  {orderProducts &&
                    // @ts-ignore
                    orderProducts.find((prod) => prod.productId === it.id)
                      .quantity}
                </p>
                <button
                  className="text-xl hover:scale-110 duration-200"
                  onClick={(e) => decreaseCartQuantity(it.id, e)}
                >
                  -
                </button>
              </div>
              <button onClick={() => removeProductFromCart(it)}>Remove</button>
            </div>
          ))}

          <ErrorMessage error={errors.productId} />
        </div>
      </div>
    </div>
  )
}

export default OrderProducts
