import React from 'react'

interface Props {
  labelText: string
  register: any
  registerProperty: string
  mappedArray: any
}

const OrderEnumSelect = ({
  labelText,
  register,
  registerProperty,
  mappedArray,
}: Props) => {
  return (
    <>
      <label className="font-medium">{labelText}</label>
      <select
        {...register(registerProperty)}
        className="block py-2 px-4 w-full text-sm text-gray-500 bg-transparent border-b-2 dark:border-white appearance-none focus:outline-none focus:ring-0 peer"
      >
        <option selected disabled={true}>
          Choose order status
        </option>
        {(Object.keys(mappedArray) as Array<keyof typeof mappedArray>)?.map(
          (it: typeof mappedArray) => (
            <option key={it} value={it}>
              {it.split('_').join(' ')}
            </option>
          )
        )}
      </select>
    </>
  )
}

export default OrderEnumSelect
