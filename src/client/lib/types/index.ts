import { employee, order, organization, product, profile } from '@prisma/client'

export interface Organization extends Partial<organization> {
  id: string
  name: string
  totalIncome: number
  logoUrl: string | null
}

export interface Income {
  id: string
  income: number
  date: Date
}

export interface Product extends Partial<product> {
  name: string
  price: number
}

export interface Order extends Partial<order> {
  product: {
    quantity: string
    productId: string
  }[]
}

export interface Employee extends Partial<employee> {
  id: string
  position: string
  salary: number
  profile?: Partial<Profile>
}

export interface Profile extends Partial<profile> {}
