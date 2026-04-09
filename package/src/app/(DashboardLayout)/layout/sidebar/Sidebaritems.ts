import { uniqueId } from 'lodash'

export interface ChildItem {
  id?: number | string
  name?: string
  icon?: any
  children?: ChildItem[]
  item?: any
  url?: any
  color?: string
  disabled?: boolean
  subtitle?: string
  badge?: boolean
  badgeType?: string
  isPro?: boolean
}

export interface MenuItem {
  heading?: string
  name?: string
  icon?: any
  id?: number
  to?: string
  items?: MenuItem[]
  children?: ChildItem[]
  url?: any
  disabled?: boolean
  subtitle?: string
  badgeType?: string
  badge?: boolean
  isPro?: boolean
}

const SidebarContent: MenuItem[] = [
  {
    heading: 'Principal',
    children: [
      {
        name: 'Dashboard Ejecutivo',
        icon: 'solar:widget-2-linear',
        id: uniqueId(),
        url: '/',
        isPro: false,
      },
    ],
  },
  {
    heading: 'Ventas',
    children: [
      {
        name: 'Cotizaciones',
        icon: 'solar:document-text-linear',
        id: uniqueId(),
        url: '/cotizaciones',
        isPro: false,
      },
      {
        name: 'Seguimiento',
        icon: 'solar:chart-2-linear',
        id: uniqueId(),
        url: '/cotizaciones/seguimiento',
        isPro: false,
      },
    ],
  },
  {
    heading: 'Operaciones',
    children: [
      {
        name: 'Órdenes de Trabajo',
        icon: 'solar:bag-5-linear',
        id: uniqueId(),
        url: '/ordenes',
        isPro: false,
      },
      {
        name: 'Calendario',
        icon: 'solar:calendar-linear',
        id: uniqueId(),
        url: '/ordenes/calendario',
        isPro: false,
      },
      {
        name: 'Papelera',
        icon: 'solar:trash-bin-minimalistic-linear',
        id: uniqueId(),
        url: '/ordenes/papelera',
        isPro: false,
      },
    ],
  },
  {
    heading: 'Finanzas',
    children: [
      {
        name: 'Facturación',
        icon: 'solar:bill-list-linear',
        id: uniqueId(),
        url: '/facturacion',
        isPro: false,
      },
      {
        name: 'Pagos Pendientes',
        icon: 'solar:card-2-linear',
        id: uniqueId(),
        url: '/facturacion/pagos-pendientes',
        isPro: false,
      },
      {
        name: 'Consumidores Finales',
        icon: 'solar:chart-square-linear',
        id: uniqueId(),
        url: '/facturacion/consumidores-finales',
        isPro: false,
      },
      {
        name: 'Gastos',
        icon: 'solar:wallet-linear',
        id: uniqueId(),
        url: '/gastos',
        isPro: false,
      },
    ],
  },
  {
    heading: 'CRM',
    children: [
      {
        name: 'Clientes',
        icon: 'solar:users-group-rounded-linear',
        id: uniqueId(),
        url: '/clientes',
        isPro: false,
      },
      {
        name: 'WhatsApp',
        icon: 'solar:chat-line-linear',
        id: uniqueId(),
        url: '/whatsapp',
        isPro: false,
      },
    ],
  },
  {
    heading: 'Catálogo',
    children: [
      {
        name: 'Catálogo Online',
        icon: 'solar:shop-linear',
        id: uniqueId(),
        url: '/catalogo',
        isPro: false,
      },
      {
        name: 'Productos',
        icon: 'solar:box-linear',
        id: uniqueId(),
        url: '/productos',
        isPro: false,
      },
    ],
  },
  {
    heading: 'Gestión',
    children: [
      {
        name: 'Tareas',
        icon: 'solar:checklist-minimalistic-linear',
        id: uniqueId(),
        url: '/tareas',
        isPro: false,
      },
      {
        name: 'Empleados',
        icon: 'solar:user-id-linear',
        id: uniqueId(),
        url: '/empleados',
        isPro: false,
      },
    ],
  },
]

export default SidebarContent
