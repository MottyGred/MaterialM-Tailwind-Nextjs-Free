'use client'

import Link from 'next/link'
import { useTheme } from 'next-themes'
import { usePathname } from 'next/navigation'
import SidebarContent from './Sidebaritems'
import SimpleBar from 'simplebar-react'
import { Icon } from '@iconify/react'
import Image from 'next/image'
import { useState } from 'react'

/* ─── Recursive menu renderer ─── */
const MenuItem = ({
  item,
  currentPath,
  onClose,
  isSubItem = false,
}: {
  item: any
  currentPath: string
  onClose?: () => void
  isSubItem?: boolean
}) => {
  const [open, setOpen] = useState(false)
  const isSelected = currentPath === item.url

  if (item.heading) {
    return (
      <p className='mt-5 mb-1 px-3 text-[10px] font-bold uppercase tracking-widest text-darklink dark:text-gray-500'>
        {item.heading}
      </p>
    )
  }

  if (item.children?.length) {
    const hasActiveChild = item.children.some((c: any) => c.url === currentPath)
    const isExpanded = open || hasActiveChild
    return (
      <div>
        <button
          onClick={() => setOpen(!isExpanded)}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors
            ${hasActiveChild
              ? 'text-primary bg-lightprimary'
              : 'text-link dark:text-darklink hover:bg-lightprimary hover:text-primary'
            }`}
        >
          {item.icon && <Icon icon={item.icon} height={20} width={20} className='flex-shrink-0' />}
          <span className='flex-1 text-left truncate'>{item.title || item.name}</span>
          <Icon icon={isExpanded ? 'solar:alt-arrow-up-linear' : 'solar:alt-arrow-down-linear'} height={14} />
        </button>
        {isExpanded && (
          <div className='ml-6 mt-0.5 flex flex-col gap-0.5 border-l border-gray-100 dark:border-gray-700 pl-2'>
            {item.children.map((child: any, i: number) => (
              <MenuItem key={i} item={child} currentPath={currentPath} onClose={onClose} isSubItem />
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div onClick={onClose}>
      <Link
        href={item.url || '#'}
        target={item.url?.startsWith('https') ? '_blank' : '_self'}
        className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors
          ${isSubItem ? 'py-1.5 text-[13px]' : ''}
          ${isSelected
            ? 'bg-lightprimary text-primary'
            : 'text-link dark:text-darklink hover:bg-lightprimary hover:text-primary'
          }`}
      >
        {item.icon && !isSubItem && (
          <Icon icon={item.icon} height={20} width={20} className='flex-shrink-0' />
        )}
        {isSubItem && (
          <span className='w-1.5 h-1.5 rounded-full bg-current flex-shrink-0 opacity-50' />
        )}
        <span className='truncate'>{item.title || item.name}</span>
      </Link>
    </div>
  )
}

/* ─── Sidebar layout ─── */
const SidebarLayout = ({ onClose }: { onClose?: () => void }) => {
  const pathname = usePathname()

  return (
    <aside className='fixed left-0 top-0 z-10 flex flex-col h-screen bg-background dark:bg-dark shadow-boxShadow overflow-hidden'
           style={{ width: '270px' }}>

      {/* ── Logo centrado ── */}
      <div className='flex flex-col items-center justify-center pt-7 pb-5 border-b border-gray-100 dark:border-gray-800 flex-shrink-0'>
        <Image
          src='/images/logos/haladas-logo.png'
          alt='Haladás Logo'
          width={88}
          height={88}
          className='object-contain mb-3'
          priority
        />
        <span className='font-bold text-[21px] text-[#1E3A5F] dark:text-white tracking-tight leading-none'>
          Haladás
        </span>
        <span className='text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C8541A] mt-1'>
          Taller Creativo
        </span>
      </div>

      {/* ── Nav items ── */}
      <SimpleBar className='flex-1 min-h-0'>
        <div className='px-4 pt-3 pb-4 flex flex-col gap-0.5'>
          {SidebarContent.map((section, si) => (
            <div key={si}>
              {[
                ...(section.heading ? [{ heading: section.heading }] : []),
                ...(section.children || []),
              ].map((item, ii) => (
                <MenuItem key={ii} item={item} currentPath={pathname} onClose={onClose} />
              ))}
            </div>
          ))}
        </div>

      </SimpleBar>
    </aside>
  )
}

export default SidebarLayout
