import React, { useEffect, useState } from 'react'
import {
  DeliveryStatus,
  Order,
  OrderProductsData,
  OrderStatus,
  Product,
} from '@lib/types'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Client } from '../../../test/seed/data'
import classnames from 'classnames'
import OrderSelect from '@components/orders/components/OrderSelect'
import ErrorMessage from '@components/orders/components/ErrorMessage'
import OrderEnumSelect from '@components/orders/components/OrderEnumSelect'
import OrderProducts from '@components/orders/components/OrderProducts'
import { createOrder } from '@lib/order'

interface Props {
  closeModal: () => void
  orders: Order[] | undefined
  organizationId: string
  setOrders: (order: Order[]) => void
  clients: Client[] | undefined
  products: Product[] | undefined
}
export interface AddOrderForm {
  discount: number
  status?: OrderStatus
  deliveryStatus?: DeliveryStatus
  clientId: string
  quantity: number
  productId: string
}

const schema = yup
  .object({
    totalPrice: yup.number(),
    discount: yup.number().min(0).max(100).default(0),
    status: yup.string(),
    deliveryStatus: yup.string(),
    clientId: yup.string(),
    product: yup.array(),
  })
  .required()

const AddOrder = ({
  orders,
  setOrders,
  organizationId,
  closeModal,
  clients,
  products,
}: Props) => {
  const [totalPrice, setTotalPrice] = useState(0)
  const [orderProducts, setOrderProducts] = useState<OrderProductsData[]>([])
  const [discount, setDiscount] = useState(0)
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<AddOrderForm>({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: {
      status: OrderStatus.UNPAID,
      deliveryStatus: DeliveryStatus.NOT_DELIVERED,
      discount: 0,
    },
  })

  useEffect(() => {
    const result: number = orderProducts.reduce((total, orderItem) => {
      const item: Product | undefined = products?.find(
        (i) => orderItem.productId === i.id
      )
      return total + (item?.price || 0) * orderItem.quantity
    }, 0)
    setTotalPrice(Math.round(result - result * (discount / 100)))
  }, [orderProducts, discount])

  const onSubmit = async (formData: AddOrderForm) => {
    // @ts-ignore
    const order = await createOrder(organizationId, {
      ...formData,
      totalPrice,
      product: orderProducts,
    })

    if (order) {
      setOrders(
        orders ? [...orders, order] : [...(orders as unknown as Order[])]
      )
      closeModal()
    }
  }

  return (
    <div
      onClick={closeModal}
      className="absolute z-10 top-0 left-0 flex items-center justify-center w-screen h-screen bg-black/75 dark:bg-black/75"
    >
      <div
        className="absolute shadow-xl bg-white dark:bg-black/75 dark:border-[1px] border-white w-[60%] h-fit z-20 rounded-lg px-5 py-8"
        onClick={(event) => event.stopPropagation()}
      >
        <p className="text-2xl text-center">Add order</p>
        <form
          className="mt-5 px-6 py-2gap-5 justify-between flex flex-col"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex justify-between">
            <div className="flex flex-col w-[45%]">
              <OrderSelect
                labelText="Client"
                register={register}
                registerProperty="clientId"
                mappedArray={clients}
              />
              <ErrorMessage error={errors.clientId} />
            </div>

            <div className="flex flex-col w-[45%]">
              <OrderEnumSelect
                labelText="Status"
                register={register}
                registerProperty="status"
                mappedArray={OrderStatus}
              />

              <ErrorMessage error={errors.status} />
            </div>
          </div>

          <div className="flex w-full justify-between mt-5">
            <div className="flex flex-col w-[45%]">
              <div className="flex flex-col ">
                <OrderEnumSelect
                  labelText="Delivery status"
                  register={register}
                  registerProperty="deliveryStatus"
                  mappedArray={DeliveryStatus}
                />

                <ErrorMessage error={errors.deliveryStatus} />
              </div>

              <div className="flex flex-col mt-5">
                <label className="font-medium">Discount</label>
                <input
                  type="number"
                  className="border-solid dark:bg-black border-b-2 outline-0 py-2 px-4"
                  placeholder="Enter percentage of discount"
                  {...register('discount', {
                    onChange: (e) => setDiscount(e.target.value),
                  })}
                />
                <ErrorMessage error={errors.discount} />
              </div>
            </div>

            <OrderProducts
              products={products}
              errors={errors}
              orderProducts={orderProducts}
              setOrderProducts={setOrderProducts}
            />
          </div>

          <div className="mt-7 flex justify-between items-center">
            <div className="flex flex-col w-[45%]">
              <p className="text-xl">Total price: {totalPrice}</p>
            </div>

            <button
              className={classnames(
                'ease-in duration-200 text-white py-3 px-6 font-bold text-md rounded-xl',
                {
                  'bg-green-500 hover:bg-green-600 dark:bg-purple-600 hover:dark:bg-purple-700':
                    isValid,
                },
                { 'bg-green-500/50 dark:bg-purple-600/50': !isValid }
              )}
              type="submit"
              disabled={!isValid}
            >
              Add order
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddOrder
