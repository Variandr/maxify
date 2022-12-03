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
  id: string
  createdAt: Date
  updatedAt: Date
  organizationId: string
  categoryId: string
  description: string
  name: string
  price: number
}

export interface Order extends order {
  id: string
  createdAt: Date
  updatedAt: Date
  organizationId: string
  totalPrice: number
  discount: number | null
  status: OrderStatus
  deliveryStatus: DeliveryStatus
  clientId: string
  product: {
    quantity: number | string
    productId: string
  }[]
}

export interface Employee extends Partial<employee> {
  id: string
  position: string
  salary: number
  profile?: Partial<Profile>
}

export interface Profile extends Partial<profile> {
  role: Role
}

export interface ProfileType extends Partial<profile> {
  employee: Partial<Employee[]>
}

export interface User extends Profile {
  employee: Array<Employee & { organization: { name: string } }>
}

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
  OWNER = 'OWNER',
}

export enum OrderStatus {
  PAID = 'PAID',
  UNPAID = 'UNPAID',
  IN_PROGRESS = 'IN_PROGRESS',
}

export enum DeliveryStatus {
  DELIVERED = 'DELIVERED',
  NOT_DELIVERED = 'NOT_DELIVERED',
  IN_THE_WAY = 'IN_THE_WAY',
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

export interface OrderProductsData {
  productId: string
  quantity: number
}
