import Head from 'next/head'
import Link from 'next/link'
import Script from 'next/script';
import Footer from '../Footer';

import styles from './Layout.module.scss';


export default function Layout({ children, home }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      </Head>
      <div className={styles.container}>

        <main>
          {children}
        </main>

        {!home && (
          <div className={styles.backToHome}>
            <Link href="/">
              <a>← На главную</a>
            </Link>
          </div>
        )}
      </div>

      <Footer />

      <Script
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)}) (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");ym(57112834, "init", { clickmap:true, trackLinks:true, accurateTrackBounce:true });`, }}
      />
      <div dangerouslySetInnerHTML={{ __html: `<noscript><div><img src="https://mc.yandex.ru/watch/57112834" style="position:absolute; left:-9999px;" alt="" /></div></noscript>` }}></div>
    </>
  )
}
