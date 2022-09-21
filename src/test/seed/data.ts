export interface Organization {
  id: string
  name: string
  description?: string | null
  totalIncome?: string | null
  logoUrl?: string | null
}

export interface Income {
  date: Date
  income: string
  organizationId?: string
}

export interface Profile {
  email: string
  name: string
  surname?: string | null
  age?: number | null
  role: Role
  password: string
  avatarUrl?: string | null
  employeeId?: string | null
}

export interface Employee {
  position: string
  salary: string
  organizationId?: string
  profileId?: string
}

export interface Category {
  name: string
}

export interface Product {
  id?: string
  description?: string | null
  name: string
  price: number
  categoryId?: string | null
  organizationId?: string
}

export interface Client {
  name: string
  address?: string | null
  location?: string | null
}

export interface Order {
  organizationId?: string
  totalPrice?: string | null
  discount?: number | null
  status: OrderStatus
  deliveryStatus: DeliveryStatus
  clientId?: string | null
  product: string[]
}

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
  OWNER = 'OWNER',
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

interface Seed {
  organizations: Organization[]
  incomes: Income[]
  employees: Employee[]
  profiles: Profile[]
  categories: Category[]
  products: Product[]
  clients: Client[]
  orders: Order[]
}

export const testData: Seed = {
  organizations: [
    {
      id: 'test',
      name: 'Maxify',
      description:
        'We are Maxims! Powerful team of developers who is going to be famous soon',
      totalIncome: '1243324',
    },
  ],
  incomes: [
    {
      date: new Date('September 01, 2022'),
      income: '13000',
    },
    {
      date: new Date('August 01, 2022'),
      income: '7324',
    },
    {
      date: new Date('July 01, 2022'),
      income: '1220.12',
    },
    {
      date: new Date('June 01, 2022'),
      income: '2323',
    },
    {
      date: new Date('May 01, 2022'),
      income: '8463',
    },
  ],
  employees: [
    {
      position: 'Junior Software Engineer',
      salary: '600',
    },
    {
      position: 'Software Engineer',
      salary: '1800',
    },
    {
      position: 'Senior Software Engineer',
      salary: '4000',
    },
    {
      position: 'CEO',
      salary: '12000',
    },
  ],
  profiles: [
    {
      email: 'test0@gmail.com',
      name: 'John',
      surname: 'Doe',
      age: 23,
      role: Role.USER,
      password: 'test1234',
    },
    {
      email: 'test1@gmail.com',
      name: 'Admin',
      age: 25,
      role: Role.ADMIN,
      password: 'test1234',
    },
    {
      email: 'test2@gmail.com',
      name: 'Owner',
      age: 20,
      role: Role.OWNER,
      password: 'test1234',
    },
  ],
  categories: [
    {
      name: 'Plan',
    },
    {
      name: 'Electronics',
    },
  ],
  products: [
    {
      id: 'product-0',
      name: 'Pro Plan',
      description: 'This is a pro plan with a lot of functionality',
      price: 50,
    },
    {
      id: 'product-1',
      name: 'Custom Plan',
      description: 'This is a custom plan with a lot of custom functionality',
      price: 100,
    },
  ],
  clients: [
    {
      name: 'Vitaliy Rozumaha',
      address: 'Kyiv, Zelenskyi street, 14',
      location: 'Kyiv, Ukraine',
    },
    {
      name: 'Andriy Bezbasheniy',
      address: 'Kyiv, Zelenskyi street, 20a',
      location: 'Kyiv, Ukraine',
    },
  ],
  orders: [
    {
      totalPrice: '190',
      status: OrderStatus.PAID,
      deliveryStatus: DeliveryStatus.IN_THE_WAY,
      discount: 5,
      product: ['product-1/2'],
    },
    {
      totalPrice: '50',
      status: OrderStatus.UNPAID,
      deliveryStatus: DeliveryStatus.NOT_DELIVERED,
      product: ['product-0/1'],
    },
    {
      totalPrice: '320',
      status: OrderStatus.PAID,
      deliveryStatus: DeliveryStatus.DELIVERED,
      discount: 20,
      product: ['product-1/3', 'product-0/2'],
    },
  ],
}
