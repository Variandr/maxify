import {
  DeliveryStatus,
  Employee,
  Gender,
  Income,
  Order,
  OrderStatus,
  Organization,
  Product,
  Profile,
  Role,
} from '../../client/lib/types'

export interface Category {
  name: string
}

export interface Client {
  name: string
  address?: string | null
  location?: string | null
}

interface Seed {
  organizations: Partial<Organization>[]
  incomes: Partial<Income>[]
  employees: Partial<Employee>[]
  profiles: Partial<Profile>[]
  categories: Partial<Category>[]
  products: Partial<Product>[]
  clients: Partial<Client>[]
  orders: Partial<Order>[]
}

export const testData: Seed = {
  organizations: [
    {
      id: 'test',
      name: 'Maxify',
      description:
        'We are Maxims! Powerful team of developers who is going to be famous soon',
      totalIncome: 1243324,
    },
  ],
  incomes: [
    {
      date: new Date('September 01, 2022'),
      income: 13000,
    },
    {
      date: new Date('August 01, 2022'),
      income: 7324,
    },
    {
      date: new Date('July 01, 2022'),
      income: 6000,
    },
    {
      date: new Date('June 01, 2022'),
      income: 500,
    },
    {
      date: new Date('May 01, 2022'),
      income: 4000,
    },
    {
      date: new Date('April 01, 2022'),
      income: 5000,
    },
    {
      date: new Date('March 01, 2022'),
      income: 3750,
    },
    {
      date: new Date('February 01, 2022'),
      income: 1200,
    },
    {
      date: new Date('January 01, 2022'),
      income: 800,
    },
    {
      date: new Date('December 01, 2022'),
      income: 20000,
    },
    {
      date: new Date('November 01, 2022'),
      income: 12500,
    },
    {
      date: new Date('October 01, 2022'),
      income: 15000,
    },
  ],
  employees: [
    {
      position: 'Junior Software Engineer',
      salary: 600,
      profileId: 'profile-0',
    },
    {
      position: 'Software Engineer',
      salary: 1800,
      profileId: 'profile-2',
    },
    {
      position: 'Senior Software Engineer',
      salary: 4000,
      profileId: 'profile-3',
    },
    {
      position: 'CEO',
      salary: 12000,
      profileId: 'profile-1',
    },
  ],
  profiles: [
    {
      id: 'profile-0',
      email: 'test0@gmail.com',
      name: 'John',
      surname: 'Doe',
      age: 23,
      role: Role.USER,
      password: '$2b$10$vnVEmYpdWFcf01ghfzNPAORUvKHraAgHwUU03KZy8pImqDeK559pa', //test1234
      phoneNumber: '+380968454585',
      gender: Gender.MALE,
      birthday: new Date('12 August 2002'),
      address: 'Zelenskiy street, 3a, 17',
      city: 'Lviv, Ukraine',
    },
    {
      id: 'profile-1',
      email: 'test1@gmail.com',
      name: 'Admin',
      age: 25,
      role: Role.ADMIN,
      password: '$2b$10$vnVEmYpdWFcf01ghfzNPAORUvKHraAgHwUU03KZy8pImqDeK559pa', //test1234
      phoneNumber: '+380968453635',
      gender: Gender.MALE,
      birthday: new Date('10 April 1992'),
      address: 'Pecherskiy district, 7b, 3',
      city: 'Kyiv, Ukraine',
    },
    {
      id: 'profile-2',
      email: 'test4@gmail.com',
      name: 'Markus',
      surname: 'Kane',
      age: 23,
      role: Role.USER,
      password: '$2b$10$vnVEmYpdWFcf01ghfzNPAORUvKHraAgHwUU03KZy8pImqDeK559pa', //test1234
      phoneNumber: '+380498453485',
      gender: Gender.MALE,
      birthday: new Date('14 March 1998'),
      address: 'Zalyzhniy street, 20a/2',
      city: 'Warsaw, Poland',
    },
    {
      id: 'profile-3',
      email: 'test3@gmail.com',
      name: 'Vitaliy',
      surname: 'Labzhinskiy',
      age: 23,
      role: Role.USER,
      password: '$2b$10$vnVEmYpdWFcf01ghfzNPAORUvKHraAgHwUU03KZy8pImqDeK559pa', //test1234
      phoneNumber: '+380968457385',
      gender: Gender.MALE,
      birthday: new Date('27 February 1999'),
      address: 'Zalyzhniy street, 9b',
      city: 'Kharkiv, Ukraine',
    },
    {
      id: 'profile-4',
      email: 'test2@gmail.com',
      name: 'Owner',
      age: 20,
      role: Role.OWNER,
      password: '$2b$10$vnVEmYpdWFcf01ghfzNPAORUvKHraAgHwUU03KZy8pImqDeK559pa', //test1234
      phoneNumber: '+380643753485',
      gender: Gender.MALE,
      birthday: new Date('8 October 2000'),
      address: 'Zalyzhniy street, 14',
      city: 'Kharkiv, Ukraine',
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
      totalPrice: 190,
      status: OrderStatus.PAID,
      deliveryStatus: DeliveryStatus.IN_THE_WAY,
      discount: 5,
      product: [{ productId: 'product-1', quantity: '2' }],
    },
    {
      totalPrice: 50,
      status: OrderStatus.UNPAID,
      deliveryStatus: DeliveryStatus.NOT_DELIVERED,
      product: [{ productId: 'product-0', quantity: '1' }],
    },
    {
      totalPrice: 320,
      status: OrderStatus.PAID,
      deliveryStatus: DeliveryStatus.DELIVERED,
      discount: 20,
      product: [
        { productId: 'product-1', quantity: '3' },
        { productId: 'product-0', quantity: '2' },
      ],
    },
  ],
}
