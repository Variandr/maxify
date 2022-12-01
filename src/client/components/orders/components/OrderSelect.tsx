import React from 'react'

interface Props {
  labelText: string
  register: any
  registerProperty: string
  mappedArray: any
}

const OrderSelect = ({
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
        {mappedArray?.map((it: typeof mappedArray) => (
          <option key={it.id} value={it.id}>
            {it.name}
          </option>
        ))}
      </select>
    </>
  )
}

export default OrderSelect
