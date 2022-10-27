import Analytics from '@assets/analytics.svg'
import Employees from '@assets/employees.svg'
import Orders from '@assets/orders.svg'
import Products from '@assets/products.svg'
import Calculator from '@assets/calculator.svg'
import Report from '@assets/report.svg'

export enum Modal {
  ANALYTICS = 'Analytics',
  EMPLOYEES = 'Employees',
  ORDERS = 'Orders',
  PRODUCTS = 'Products',
  CALCULATOR = 'Calculator',
  REPORT = 'Report',
  PROFILE = 'Profile',
  SETTINGS = 'Settings',
}

export const modals = [
  {
    name: Modal.ANALYTICS,
    url: Analytics,
  },
  {
    name: Modal.EMPLOYEES,
    url: Employees,
  },
  {
    name: Modal.ORDERS,
    url: Orders,
  },
  {
    name: Modal.PRODUCTS,
    url: Products,
  },
  {
    name: Modal.CALCULATOR,
    url: Calculator,
  },
  {
    name: Modal.REPORT,
    url: Report,
  },
]

export const userModals = [
  {
    name: Modal.PROFILE,
  },
  {
    name: Modal.SETTINGS,
  },
]
