import AuthModal from './AuthModal'
import BackgroundLayout from './BackgroundLayout'
import ForgotPassword from './ForgotPassword'
import { useState } from 'react'

const Authorization = () => {
  const [forgotPassword, setForgotPassword] = useState(false)
  return (
    <div className="flex justify-center items-center">
      <BackgroundLayout>
        {forgotPassword ? (
          <ForgotPassword
            closeForgotPassword={() => setForgotPassword(false)}
          />
        ) : (
          <AuthModal openForgotPassword={() => setForgotPassword(true)} />
        )}
      </BackgroundLayout>
    </div>
  )
}

export default Authorization
