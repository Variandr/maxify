import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";

const schema = yup.object({
  email: yup.string().email().required()
});

const ForgotPassword = () => {
  const [isPasswordSent, setIsPasswordSent] = useState(false);

  const { register, handleSubmit, formState: { errors, isValid } } = useForm<{ email: string }>({
    resolver: yupResolver(schema),
    mode: "all"
  });

  const onSubmit = (data: { email: string }) => console.log(data);

  return (
    <div className={"w-[450px] h-[305px] bg-white rounded-xl font-basic flex flex-col justify-center"}>
      {!isPasswordSent ?
        <>
          <h1 className="text-center text-4xl mt-10">Forgot your password?</h1>

          <form className=" py-6 px-10 flex flex-col" onSubmit={handleSubmit(onSubmit)}>
            <p className={"text-center"}>We'll email you a link to reset your password</p>

            <input
              className="mt-5 border-solid border-b-2 outline-0 py-2 px-4 w-full text-gray-700"
              placeholder="Type your email"
              {...register("email")}
            />
            <div>
              {errors.email && <p className={"absolute text-red-600 text-sm"}>{errors.email?.message}</p>}
            </div>

            <div className={"flex justify-between"}>
              <button
                className="mt-9 w-[47%] bg-green-500 hover:bg-green-600 ease-in duration-200 text-white border py-3 px-6 font-bold text-md rounded-xl"
                type="submit"
                disabled={!isValid}
              >
                Reset password
              </button>

              <button
                className="mt-9 w-[47%] bg-gray-500 hover:bg-gray-600 ease-in duration-200 text-white border py-3 px-6 font-bold text-md rounded-xl"
              >
                Cancel
              </button>
            </div>
          </form>
        </>
        :
        <h1 className={"text-3xl self-center "}>Please check your email!</h1>
      }
    </div>
  );
};

export default ForgotPassword;
