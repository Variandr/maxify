import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import classnames from 'classnames'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { setAuthStatus } from '../../../store/actions/profile'

interface LoginData {
  email: string
  password: string
}

interface Props {
  openForgotPassword: () => void
}

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required()

const AuthModal = ({ openForgotPassword }: Props) => {
  const router = useRouter()
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginData>({
    resolver: yupResolver(schema),
    mode: 'all',
  })

  const onSubmit = () => {
    dispatch(setAuthStatus(true))
    return router.push('/')
  }

  return (
    <div className="w-[375px] bg-white rounded-xl font-basic">
      <h1 className="text-center text-4xl mt-10">Login</h1>
      <form
        className="py-10 mt-4 px-10 flex flex-col"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="text-gray-600 font-medium">Email</label>
        <input
          className="border-solid border-b-2 outline-0 py-2 px-4 w-full text-gray-700"
          placeholder="Type your email"
          {...register('email')}
        />
        {errors.email && (
          <p className={'text-red-600 text-sm'}>{errors.email?.message}</p>
        )}

        <label className="text-gray-600 font-medium mt-2">Password</label>
        <input
          className="border-solid border-b-2 outline-0 py-2 px-4 w-full text-gray-700"
          type="password"
          placeholder="Type your password"
          {...register('password')}
        />
        {errors.password && (
          <p className="text-red-600 text-sm">{errors.password?.message}</p>
        )}

        <a
          onClick={openForgotPassword}
          className="inline self-end mt-4 cursor-pointer"
        >
          Forgot password?
        </a>

        <button
          className={classnames(
            'mt-8 w-full ease-in duration-200 text-green-100 border py-3 px-6 font-bold text-md rounded-xl',
            { 'bg-green-500 hover:bg-green-600': isValid },
            { 'bg-green-500/50': !isValid }
          )}
          type="submit"
          disabled={!isValid}
          onClick={onSubmit}
        >
          LOGIN
        </button>
      </form>
    </div>
  )
}

export default AuthModal
