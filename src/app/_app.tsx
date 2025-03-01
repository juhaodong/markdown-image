// pages/_app.tsx (TS) 或 pages/_app.js (JS)

import { useEffect } from 'react'
import Script from 'next/script' // Next.js Script 组件，用于优化外部脚本加载

const GA_TRACKING_ID = 'G-1E2YG3NC8T' // 替换为你的 Google Analytics Tracking ID

// @ts-ignore
export default function App({ Component, pageProps }) {
  useEffect(() => {
    if (GA_TRACKING_ID && process.env.NODE_ENV === 'production') {
      // @ts-ignore
      window.dataLayer = window.dataLayer || [];
      // @ts-ignore
      function gtag(...args) {
        // @ts-ignore
        window.dataLayer.push(args);
      }
      gtag('js', new Date());
      gtag('config', GA_TRACKING_ID); // 配置 GA
    }
  }, []);

  return (
    <>
      {/* Google Analytics 的外部脚本，使用 Next.js 提供的 Script 组件 */}
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        strategy="afterInteractive" // 在页面交互后加载
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_TRACKING_ID}');
        `}
      </Script>
      <Component {...pageProps} />
    </>
  );
}
