import React, { Dispatch, SetStateAction, useState } from 'react'
import { OrderProductsData, Product } from '@lib/types'

interface Props {
  products: Product[] | undefined
  orderProducts: OrderProductsData[]
  setOrderProducts: Dispatch<SetStateAction<OrderProductsData[]>>
}

const EditOrderProduct = ({
  setOrderProducts,
  orderProducts,
  products,
}: Props) => {
  const [selectedProducts, setSelectedProducts] = useState(
    orderProducts.map((item) => {
      // @ts-ignore
      return products.find((product) => product.id === item.productId)
    })
  )

  const addProductToCart = (product: Product, e: any) => {
    e.preventDefault()
    if (selectedProducts.find((prod) => prod!.id === product.id)) {
      increaseCartQuantity(product.id, e)
    } else {
      setSelectedProducts([
        ...(selectedProducts as Product[]),
        // @ts-ignore
        product,
      ])
      setOrderProducts([
        ...orderProducts,
        {
          productId: product.id,
          quantity: 1,
        },
      ])
    }
  }

  const removeProductFromCart = (product: Product, e: any) => {
    e.preventDefault()
    setSelectedProducts(selectedProducts?.filter((it) => it!.id !== product.id))
    setOrderProducts(orderProducts.filter((it) => it.productId !== product.id))
  }

  function decreaseCartQuantity(id: string, e: any) {
    e.preventDefault()
    if (orderProducts.find((item) => item.productId === id)?.quantity === 1) {
      return removeProductFromCart(products?.find((it) => it.id === id)!, e)
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

  return (
    <div className="flex flex-col w-[45%]">
      <div>
        <p className="font-medium text-center">Available products</p>
        <div className="h-fit overflow-y-auto h-[100px] scrollbar-hide">
          {products?.map((it) => (
            <div key={it.id} className="flex justify-between">
              {it.name}
              <button onClick={(e) => addProductToCart(it, e)}>
                Add product
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-1">
        <p className="font-medium text-center">Selected products</p>
        <div className="h-fit overflow-y-auto h-[100px] scrollbar-hide">
          {selectedProducts?.map((it) => (
            <div
              key={it!.id}
              className="flex justify-between items-center mb-1"
            >
              <p className="w-1/3">{it!.name}</p>
              <div className="flex items-center">
                <button
                  className="text-xl hover:scale-110 duration-300 "
                  onClick={(e) => increaseCartQuantity(it!.id, e)}
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
                  onClick={(e) => decreaseCartQuantity(it!.id, e)}
                >
                  -
                </button>
              </div>
              <button onClick={(e) => removeProductFromCart(it as Product, e)}>
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default EditOrderProduct
