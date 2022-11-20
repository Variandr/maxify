import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { setAuthStatus, setProfile } from '@store/actions/profile'
import axios from 'axios'
import { useEffect, useState } from 'react'
import classnames from 'classnames'
import BackgroundLayout from '@components/authorization/BackgroundLayout'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { ErrorMessage } from '@lib/types/api'

interface ResetForm {
  password: string
  confirmPassword: string
}

const schema = yup
  .object({
    password: yup.string().required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords must match')
      .required(),
  })
  .required()

const ResetPassword = () => {
  const [email, setEmail] = useState<string>()
  const [errorMessage, setErrorMessage] = useState<string>('')

  const router = useRouter()
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ResetForm>({
    resolver: yupResolver(schema),
    mode: 'all',
  })

  const onSubmit = async (formData: ResetForm) => {
    try {
      const data = await axios
        .put('/api/auth/reset/changePassword', {
          email,
          newPassword: formData.password,
        })
        .then((res) => res.data)
      if (data?.profile) {
        dispatch(setProfile(data?.profile))
        dispatch(setAuthStatus(true))
        localStorage.setItem('access_token', data?.token)
        await router.push('/')
      } else {
        setErrorMessage(ErrorMessage.ACCOUNT_WAS_NOT_FOUND_V2)
      }
    } catch {
      setErrorMessage(ErrorMessage.ACCOUNT_WAS_NOT_FOUND_V2)
    }
  }

  const validate = async () => {
    try {
      const data: { email?: string } = await axios
        .get(
          `/api/auth/reset/validate?restoreToken=${router.query?.restoreToken}`
        )
        .then((res) => res.data)
      if (data) {
        setEmail(data.email)
      } else {
        setErrorMessage(ErrorMessage.ACCOUNT_WAS_NOT_FOUND_V2)
      }
    } catch {
      setErrorMessage(ErrorMessage.ACCOUNT_WAS_NOT_FOUND_V2)
    }
  }

  useEffect(() => {
    if (router.query?.restoreToken) {
      void validate()
    }
  }, [router.query])

  return (
    <div className="flex justify-center items-center">
      <BackgroundLayout>
        <div className="w-[375px] bg-white rounded-xl font-basic">
          <h1 className="text-center text-4xl mt-10">Login</h1>
          <form
            className="py-10 mt-4 px-10 flex flex-col"
            onSubmit={handleSubmit(onSubmit)}
          >
            <label className="text-gray-600 font-medium">Password</label>
            <input
              className="border-solid border-b-2 outline-0 py-2 px-4 w-full text-gray-700"
              type="password"
              placeholder="Type your email"
              {...register('password')}
            />
            {errors.password && (
              <p className={'text-red-600 text-sm'}>
                {errors.password?.message}
              </p>
            )}

            <label className="text-gray-600 font-medium mt-2">
              Confirm Password
            </label>
            <input
              className="border-solid border-b-2 outline-0 py-2 px-4 w-full text-gray-700"
              type="password"
              placeholder="Type your password"
              {...register('confirmPassword')}
            />
            {errors.confirmPassword && (
              <p className="text-red-600 text-sm">
                {errors.confirmPassword?.message}
              </p>
            )}

            {errorMessage && (
              <p className="text-red-600 text-sm text-center">{errorMessage}</p>
            )}
            <button
              className={classnames(
                'mt-8 w-full ease-in duration-200 text-green-100 border py-3 px-6 font-bold text-md rounded-xl',
                { 'bg-green-500 hover:bg-green-600': isValid },
                { 'bg-green-500/50': !isValid }
              )}
              type="submit"
              disabled={!isValid}
            >
              RESET PASSWORD
            </button>
          </form>
        </div>
      </BackgroundLayout>
    </div>
  )
}

export default ResetPassword
