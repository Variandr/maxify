import React from 'react'

interface Props {
  error: any
}
const ErrorMessage = ({ error }: Props) => {
  return (
    error && (
      <p className="text-red-600 text-sm whitespace-nowrap overflow-hidden text-ellipsis">
        {error.message}
      </p>
    )
  )
}

export default ErrorMessage
