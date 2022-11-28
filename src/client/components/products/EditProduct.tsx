import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import classnames from 'classnames'
import { Product } from '@lib/types'
import { Category } from '../../../test/seed/data'
import { editProduct } from '@lib/product'

interface Props {
  closeModal: () => void
  setProducts: (product: Product[]) => void
  products?: Product[]
  product: Product
  categories: Category[] | undefined
}

export interface EditProductForm {
  categoryId?: string
  name?: string
  price?: number
  description?: string
}

const schema = yup
  .object({
    categoryId: yup.string(),
    name: yup.string(),
    price: yup.number(),
    description: yup.string(),
  })
  .required()

const EditProduct = ({
  closeModal,
  products,
  setProducts,
  product,
  categories,
}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<EditProductForm>({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: {
      description: product.description,
      name: product.name,
      price: product.price,
      categoryId: product.categoryId,
    },
  })

  const onSubmit = async (formData: EditProductForm) => {
    const editedProduct = await editProduct({
      ...product,
      ...(formData.description && { description: formData.description }),
      ...(formData.name && { name: formData.name }),
      ...(formData.price && { price: formData.price }),
      ...(formData.categoryId && { categoryId: formData.categoryId }),
    })

    if (editedProduct) {
      const updatedProducts = products?.map((it) => {
        if (it.id === editedProduct.id) {
          return {
            ...it,
            description: editedProduct.description,
            name: editedProduct.name,
            price: editedProduct.price,
            categoryId: editedProduct.categoryId,
          }
        }
        return it
      })
      setProducts(updatedProducts ?? [])
      closeModal()
    }
  }

  return (
    <div
      onClick={closeModal}
      className="absolute z-10 top-0 left-0 flex items-center justify-center w-screen h-screen bg-black/75 dark:bg-black/75"
    >
      <div
        className="absolute shadow-xl bg-white dark:bg-black/75 dark:border-[1px] border-white w-[45%] h-fit z-20 rounded-lg px-5 py-8"
        onClick={(event) => event.stopPropagation()}
      >
        <p className="text-2xl text-center">Edit product</p>
        <form
          className="mt-5 px-6 py-2gap-5 justify-between flex flex-col"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex justify-between">
            <div className="flex flex-col w-[45%]">
              <label className="font-medium">Name</label>
              <input
                className="border-solid dark:bg-black border-b-2 outline-0 py-2 px-4"
                placeholder="Type new product name"
                {...register('name')}
              />
              {errors.name && (
                <p className="text-red-600 text-sm">{errors.name?.message}</p>
              )}
            </div>

            <div className="flex flex-col w-[45%]">
              <label className="font-medium">Price</label>
              <input
                className="border-solid dark:bg-black  border-b-2 outline-0 py-2 px-4"
                placeholder="Type new product price"
                {...register('price')}
              />
              {errors.price && (
                <p className="text-red-600 text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                  {errors.price?.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col mt-3">
            <label className="font-medium">Description:</label>
            <textarea
              className="w-full h-[100px] border-solid dark:bg-black border-b-2 outline-0 py-2 px-4"
              placeholder="Type new product description"
              {...register('description')}
            ></textarea>
          </div>

          <div className="flex justify-between">
            <div className="flex mt-5 items-center w-1/2">
              <select
                {...register('categoryId')}
                className="block py-2 px-4 w-full text-sm text-gray-500 bg-transparent border-b-2 dark:border-white appearance-none focus:outline-none focus:ring-0 peer"
              >
                {categories?.map((it) => (
                  <option key={it.id} value={it.id}>
                    {it.name}
                  </option>
                ))}
              </select>
              {errors.categoryId && (
                <p className="text-red-600 text-sm">
                  {errors.categoryId?.message}
                </p>
              )}
            </div>

            <button
              className={classnames(
                'mt-5 ease-in duration-200 text-white py-3 px-6 font-bold text-md rounded-xl',
                {
                  'bg-green-500 hover:bg-green-600 dark:bg-purple-600 hover:dark:bg-purple-700':
                    isValid,
                },
                { 'bg-green-500/50 dark:bg-purple-600/50': !isValid }
              )}
              type="submit"
              disabled={!isValid}
            >
              Edit product
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditProduct
