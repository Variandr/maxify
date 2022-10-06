export interface Organization {
  id: string
  name: string
  createdAt?: Date
  totalIncome: number
  logoUrl: string | null
  description?: string
}

export interface Income {
  id: string
  income: number
  date: Date
}

export interface Product {
  id: string
  createdAt?: Date
  updatedAt?: Date
  name: string
  description?: string
  price: number
}

enum OrderStatus {
  PAID = 'PAID',
  UNPAID = 'UNPAID',
  IN_PROGRESS = 'IN_PROGRESS',
}

enum DeliveryStatus {
  DELIVERED = 'DELIVERED',
  NOT_DELIVERED = 'NOT_DELIVERED',
  IN_THE_WAY = 'IN_THE_WAY',
}

export interface Order {
  id: string
  createdAt?: Date
  updatedAt?: Date
  totalPrice: number
  status: OrderStatus
  deliveryStatus: DeliveryStatus
  discount: number | null
  product: {
    quantity: string
    productId: string
  }[]
}

export interface Employee {
  id: string
  createdAt?: Date
  position: string
  salary: number
  profile?: Partial<Profile>
}

export interface Profile {
  id: string
  name: string
  surname?: string
  age: number
  avatarUrl?: string
  email: string
}
