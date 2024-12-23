import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  const siteTitle = 'Дизайн-код Екатеринбурга';
  const siteDescription = 'Мы отвечаем за всю красоту, комфорт и уют и создаём самый приятный город в России. Мы задаём стандарты дизайна и ведём комплексные проекты: от разработки графики и архитектурных элементов до развития территорий.';

  return (
    <Html lang="ru">
      <Head>
        <meta name="theme-color" content="#000000" />
        <meta name="description" content={siteDescription} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://ekaterinburg.design/`} />
        <meta property="og:title" content={siteTitle} />
        <meta property="og:description" content={siteDescription} />
        <meta property="og:image" content="https://ekaterinburg.design/og-preview.jpg" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`https://ekaterinburg.design/`} />
        <meta property="twitter:title" content={siteTitle} />
        <meta property="twitter:description" content={siteDescription} />
        <meta property="twitter:image" content="https://ekaterinburg.design/og-preview.jpg" />

        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="dns-prefetch" href="https://mc.yandex.ru/" />

        <meta name="yandex-verification" content="94c725a9e4228358" />
        <meta name="facebook-domain-verification" content="l85smr2ck81ubuv1qof1bylyds521p" />
        <meta name="zen-verification" content="xFOYqPh93yqz68qsQBCCrcBzbyjvIdm5G9BuCTJcBU9u1oZpj4jNL9jlycEpvMv3" />
      </Head>
      <body>
        <Main />
        <NextScript />

        <div
          dangerouslySetInnerHTML={{
            __html: `<script>(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)}) (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");ym(57112834, "init", { clickmap:true, trackLinks:true, accurateTrackBounce:true });</script><noscript><div><img src="https://mc.yandex.ru/watch/57112834" style="position:absolute; left:-9999px;" alt="" /></div></noscript>` }}
        />
      </body>
    </Html>
  )
}
