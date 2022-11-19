import React from 'react'

interface Props {
  message: string
}

const Error = ({ message }: Props) => {
  return (
    <>
      {message && (
        <div className="absolute bottom-3 bg-red-500 px-5 py-3 rounded">
          {message}
        </div>
      )}
    </>
  )
}

export default Error
