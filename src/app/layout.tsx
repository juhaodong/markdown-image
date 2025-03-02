import type { Metadata } from 'next'
import { Archivo } from 'next/font/google'
import './globals.css'
import Nav from '@/components/nav'
import { ThemeProvider } from '@/components/theme-provider'
import { Analytics } from '@vercel/analytics/react'

const archivo = Archivo({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '以文生图',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={archivo.className}>
        <ThemeProvider attribute="class">
          <div className="grid h-[1200px] max-h-[100dvh] w-[1000px] max-w-[1000px] grid-cols-[100px_auto] rounded-base shadow-[10px_10px_0_0_#000] outline outline-4 outline-border dark:outline-darkBorder w600:grid-cols-[70px_auto] w500:grid-cols-1 portrait:h-[100dvh]">
            <header className="relative flex items-center justify-center rounded-l-base border-r-4 border-r-border bg-main dark:border-r-darkBorder w500:hidden portrait:rounded-none">
              <h1 className="whitespace-nowrap text-[40px] font-bold tracking-[4px] smallHeight:text-[30px] smallHeight:tracking-[2px] w600:text-[30px] w600:tracking-[2px]">
                <span
                  style={{
                    writingMode: 'vertical-rl', // 设置竖排方向
                    textOrientation: 'upright', // 保证字符是直立显示
                  }}
                  className="text-zh inline-block
                text-text"
                >
                  以文生图
                </span>
              </h1>
            </header>
            <main
              className="relative flex h-[1200px] max-h-[100dvh] flex-col rounded-br-base rounded-tr-base
             bg-bg font-semibold
             dark:bg-darkBg portrait:h-[100dvh] portrait:max-h-[100dvh] portrait:rounded-none"
            >
              <Nav />
              <div className="main h-full max-h-[1150px] overflow-y-auto portrait:max-h-[calc(100dvh-50px)]">
                {children}
              </div>
            </main>
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
