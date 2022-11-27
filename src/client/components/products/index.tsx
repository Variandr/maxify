import React, { useEffect, useState } from 'react'
import { Product, Role } from '@lib/types'
import { deleteProduct, getProductsByOrganizationId } from '@lib/product'
import ProductItem from '@components/products/ProductItem'
import Image from 'next/image'
import AddProductIcon from '@assets/add-product.svg'
import { useSelector } from 'react-redux'
import { getProfile } from '@store/selectors/profile'
import AddProduct from '@components/products/AddProduct'
import EditProduct from '@components/products/EditProduct'
import { getCategoriesByOrganizationId } from '@lib/category'
import { Category } from '../../../test/seed/data'

interface Props {
  organizationId: string
  role?: Role
}
const Products = ({ organizationId, role }: Props) => {
  const [products, setProducts] = useState<Product[]>()
  const [categories, setCategories] = useState<Category[]>()
  const [addProductModal, showAddProductModal] = useState(false)
  const [editProduct, setEditProduct] = useState<Product>()
  const profile = useSelector(getProfile)

  const getProducts = async () => {
    const productsData = await getProductsByOrganizationId(organizationId)
    setProducts(productsData)
  }

  const getCategories = async () => {
    const categoriesData = await getCategoriesByOrganizationId()
    setCategories(categoriesData)
  }

  useEffect(() => {
    void getProducts()
    void getCategories()
  }, [organizationId])

  const removeProduct = async (productId: string) => {
    const removedProduct = await deleteProduct(productId)
    if (removedProduct) {
      setProducts(
        products?.filter((it: Product) => it.id !== removedProduct.id)
      )
    }
  }

  return (
    <>
      <div className="flex flex-col h-[75vh] overflow-y-hidden rounded">
        {products?.length && (
          <div className="flex px-5 py-3 gap-5 text-xl bg-zinc-200 dark:bg-zinc-900/50">
            <p className="w-3/12">Name</p>
            <p className="w-5/12">Description</p>
            <p className="w-2/12">Price ₴</p>
          </div>
        )}
        {products?.length ? (
          products?.map((it, index) => (
            <ProductItem
              key={it.id}
              product={it}
              index={index}
              removeProduct={removeProduct}
              setEditProduct={setEditProduct}
              role={role}
            />
          ))
        ) : (
          <p className="text-center">
            The product list is empty. you can add new ones
          </p>
        )}
      </div>

      {Role.USER !== profile.role && (
        <div className="absolute bottom-3 right-5 hover:scale-110 duration-300">
          <Image
            onClick={() => showAddProductModal(true)}
            src={AddProductIcon}
            width={50}
            height={50}
            alt="add product"
            className="dark:invert cursor-pointer"
          />
        </div>
      )}

      {addProductModal && (
        <AddProduct
          organizationId={organizationId}
          closeModal={() => showAddProductModal(false)}
          products={products}
          categories={categories}
          setProducts={setProducts}
        />
      )}

      {editProduct && (
        <EditProduct
          closeModal={() => setEditProduct(undefined)}
          products={products}
          setProducts={setProducts}
          product={editProduct}
          categories={categories}
        />
      )}
    </>
  )
}

export default Products
