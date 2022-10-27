import {
  employee,
  order,
  organization,
  product,
  profile,
  income,
} from '@prisma/client'

export interface Organization extends Partial<organization> {
  id: string
  name: string
  totalIncome: number
  logoUrl: string | null
}

export interface Income extends income {
  id: string
}

export interface Product extends Partial<product> {
  name: string
  price: number
}

export interface Order extends order {
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

export interface ProfileType extends Partial<profile> {
  employee: Partial<Employee[]>
}

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
  OWNER = 'OWNER',
}
