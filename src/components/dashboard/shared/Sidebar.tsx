import React from 'react'
// import classNames from 'classnames'
// import { Link, useLocation } from 'react-router-dom'

// import { FcBullish } from 'react-icons/fc'
// import { HiOutlineLogout } from 'react-icons/hi'
import { DASHBOARD_SIDEBAR_LINKS, DASHBOARD_SIDEBAR_BOTTOM_LINKS } from '../lib/constants'
import { cn } from '@/lib/utils'
import { Key } from 'lucide-react'
import Link from 'next/link'

const linkClass =
    'flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base'

export default function Sidebar({ sidebarItems,selectedItem }) {
    return (
        <div className="bg-neutral-900 p-3 flex flex-col">
            <div className="flex items-center gap-2 px-1 py-3">
                <Key fontSize={24} />
                <span className="text-neutral-200 text-lg">OpenShop</span>
            </div>
            <div className="py-8 flex flex-1 flex-col gap-0.5">
                {sidebarItems.map((item) => (
                    // <SidebarLink key={link.key} link={link} />
                    <span
                        // href={item?.path}
                        className={cn(selectedItem === item  ? 'bg-neutral-700 text-white' : 'text-neutral-400', linkClass)}
                    >
                        {/* <span className="text-xl">{link?.icon}</span> */}
                        <Key />
                        {item?.label}
                    </span>
                ))}
            </div>
            {/* <div className="flex flex-col gap-0.5 pt-2 border-t border-neutral-700">
                {sidebarItems?.map((link) => (
                    // <SidebarLink key={link.key} link={link} />
                    <Link
                        href={link.path}
                        className={cn(sidebarItems === link?.path ? 'bg-neutral-700 text-white' : 'text-neutral-400', linkClass)}
                    >
                        <span className="text-xl">{link.icon}</span>
                        {link.label}
                    </Link>
                ))}
                <div className={cn(linkClass, 'cursor-pointer text-red-500')}>
                    <span className="text-xl">
                        <Key />
                    </span>
                    Logout
                </div>
            </div> */}
        </div>
    )
}

// function SidebarLink({ link }) {
// 	const  pathname = ''

// 	return (
// 		<Link
// 			href={link.path}
// 			className={cn(pathname === link.path ? 'bg-neutral-700 text-white' : 'text-neutral-400', linkClass)}
// 		>
// 			<span className="text-xl">{link.icon}</span>
// 			{link.label}
// 		</Link>
// 	)
// }