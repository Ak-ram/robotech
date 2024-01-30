import { Key } from 'lucide-react'
// import {
// 	HiOutlineViewGrid,
// 	HiOutlineCube,
// 	HiOutlineShoppingCart,
// 	HiOutlineUsers,
// 	HiOutlineDocumentText,
// 	HiOutlineAnnotation,
// 	HiOutlineQuestionMarkCircle,
// 	HiOutlineCog
// } from 'react-icons/hi'

export const DASHBOARD_SIDEBAR_LINKS = [
	{
		key: 'dashboard',
		label: 'Dashboard',
		path: '/',
		icon: <Key />
	},
	{
		key: 'products',
		label: 'Products',
		path: '/products',
		icon: <Key />
	},
	{
		key: 'orders',
		label: 'Orders',
		path: '/orders',
		icon: <Key />
	},
	{
		key: 'customers',
		label: 'Customers',
		path: '/customers',
		icon: <Key />
	},
	{
		key: 'transactions',
		label: 'Transactions',
		path: '/transactions',
		icon: <Key />
	},
	{
		key: 'messages',
		label: 'Messages',
		path: '/messages',
		icon: <Key />
	}
]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
	{
		key: 'settings',
		label: 'Settings',
		path: '/settings',
		icon: <Key />
	},
	{
		key: 'support',
		label: 'Help & Support',
		path: '/support',
		icon: <Key />
	}
]