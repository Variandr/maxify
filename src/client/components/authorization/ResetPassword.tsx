import { Profile } from '@lib/types'
import Image from 'next/image'
import Logo from '@assets/logo.svg'
import React from 'react'

interface Props {
  profile: Profile
  link: string
}

const ResetPassword = ({ profile, link }: Props) => {
  return (
    <html>
      <div
        style={{
          margin: 'auto',
          display: 'flex',
          minWidth: '50%',
          maxWidth: '60%',
          padding: '4rem 2.5rem 4rem 2.5rem',
          flexDirection: 'column',
          borderRadius: '2%',
          boxShadow:
            '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              fontWeight: '700',
              fontSize: '1.875rem',
              lineHeight: '1.5',
              width: '18rem',
            }}
          >
            Reset your Maxify password
          </div>
          <Image
            src={Logo}
            alt="user account"
            style={{ filter: 'invert(100%)' }}
            width={145}
            height={100}
          />
        </div>
        <div
          style={{
            margin: '1.25rem 1.5rem 0 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center',
            fontSize: '1.125rem',
            lineHeight: '1.75rem',
            gap: '1.25rem',
          }}
        >
          <div>{`Hi ${profile?.name} ${profile?.surname},`}</div>
          <div>{`We're sending you this email because you requested a password reset. Click on this link to create a new password:`}</div>
        </div>
        <div
          style={{
            textAlign: 'center',
            margin: '2.5rem 0',
          }}
        >
          <a
            style={{
              padding: '1rem 4rem 1rem 4rem',
              fontWeight: '700',
              fontSize: '1.5rem',
              lineHeight: '2rem',
              color: 'white',
              borderRadius: '9999px',
              backgroundColor: 'rgb(74 222 128)',
              textDecoration: 'none',
            }}
            href={link}
          >
            Set a new password
          </a>
        </div>
        <div
          style={{
            textAlign: 'center',
            fontSize: '1.125rem',
            lineHeight: '1.75rem',
            margin: '0 1.5rem',
          }}
        >
          If you didn't request a password reset, you can ignore this email.
          Your password will not be changed.
        </div>
        <div
          style={{
            textAlign: 'center',
            fontSize: '1.125rem',
            lineHeight: '1.75rem',
            marginTop: '2.5rem',
            fontWeight: '700',
          }}
        >
          Best wishes, Maxify team
        </div>
      </div>
    </html>
  )
}
export default ResetPassword
