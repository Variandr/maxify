import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

interface ILoginFormData {
  email: string;
  password: string;
}

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string()
    .required()
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
}).required();

const AuthModal = () => {
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<ILoginFormData>({
    resolver: yupResolver(schema),
    mode: "onBlur"
  });

  const onSubmit = (data: ILoginFormData) => console.log(data);

  return (
    <div className={'w-[375px] bg-white rounded-xl font-basic'}>
      <h1 className="text-center text-4xl mt-10">Login</h1>
      <form className=" py-10 mt-4 px-10 flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <label className="text-gray-600 font-medium">Email</label>
        <input
          className="border-solid border-b-2 outline-0 py-2 px-4 w-full text-gray-700"
          placeholder="Type your email"
          {...register("email")}
        />
        {errors.email ? <p className={'text-red-600 text-sm'}>{errors.email?.message}</p> : null}

        <label className="text-gray-600 font-medium mt-2">
          Password
        </label>
        <input
          className="border-solid border-b-2 outline-0 py-2 px-4 w-full text-gray-700"
          type="password"
          placeholder={"Type your password"}
          {...register("password")}
        />
        {errors.password ? <p className={'text-red-600 text-sm'}>{errors.password?.message}</p> : null}

        <a className={'inline self-end mt-4 cursor-pointer'}>Forgot password?</a>

        <button
          className="mt-8 w-full bg-green-500 hover:bg-green-600 ease-in duration-200 text-green-100 border py-3 px-6 font-bold text-md rounded-xl"
          type="submit"
          disabled={!isValid}
        >
          LOGIN
        </button>
      </form>
    </div>
  );
};

export default AuthModal;
