import Analytics from '@assets/analytics.svg'
import Employees from '@assets/employees.svg'
import Orders from '@assets/orders.svg'
import Products from '@assets/products.svg'
import Organizations from '@assets/organizations.svg'

//import Report from '@assets/report.svg'

export enum Modal {
  ANALYTICS = 'Analytics',
  EMPLOYEES = 'Employees',
  ORDERS = 'Orders',
  PRODUCTS = 'Products',
  CALCULATOR = 'Calculator',
  REPORT = 'Report',
  PROFILE = 'Profile',
  EDIT_PROFILE = 'Edit Profile',
  SETTINGS = 'Settings',
  ORGANIZATIONS = 'Organizations',
  ADMINS = 'Admins',
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
  /* TODO: maybe we will do it in feature
  {
    name: Modal.CALCULATOR,
    url: Calculator,
  },
  {
    name: Modal.REPORT,
    url: Report,
  },*/
]

export const adminModals = [
  /* TODO: maybe we will do it in feature
  {
    name: Modal.ANALYTICS,
    url: Analytics,
  },*/
  {
    name: Modal.ORGANIZATIONS,
    url: Organizations,
  },
  {
    name: Modal.ADMINS,
    url: Employees,
  },
]

export const userModals = [{ name: Modal.PROFILE }, { name: Modal.SETTINGS }]
