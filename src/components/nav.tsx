'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ThemeSwitcher } from './theme-switcher'

export default function Nav() {
  const path = usePathname()

  return (
    <nav className="grid h-[50px] grid-cols-[1fr_1fr_50px] rounded-tr-base border-b-4 border-b-border bg-black text-xl dark:border-b-darkBorder w600:text-lg w400:h-10 w400:text-base portrait:rounded-none">
      <Link
        className={clsx(
          'flex h-full items-center justify-center uppercase',
          path === '/' ? 'bg-black text-white' : 'bg-main text-text',
        )}
        href="/"
      >
        输入文字
      </Link>
      <div
        className={clsx(
          'flex h-full items-center justify-center uppercase',
          path === '/work' ? 'bg-black text-white' : 'bg-main text-text',
        )}
      >
        Rednote: 我在德国写代码
      </div>
      <ThemeSwitcher />
    </nav>
  )
}
