import Head from 'next/head'
import Link from 'next/link'
import Script from 'next/script';
import Footer from '../Footer';
import Menu from '../Menu';

import styles from './Layout.module.scss';


export default function Layout({ children, home }) {
  const siteTitle = 'Дизайн-код Екатеринбурга';
  const siteDescription = '«Дизайн-код Екатеринбурга» — инициативный проект независимых дизайнеров города. Мы разрабатываем единые визуальные стандарты городской среды и внедряем их в жизнь. Наша цель — сделать Екатеринбург уютным и комфортным, чтобы жителям хотелось остаться, а гостям захотелось вернуться.';

  return (
    <>
      <div className={styles.container}>
        <Head>
          <meta name="theme-color" content="#000000" />
          <meta name="description" content={siteDescription} />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />

          <meta property="og:type" content="website" />
          <meta property="og:url" content={`https://${process.env.VERCEL_URL}/`} />
          <meta property="og:title" content={siteTitle} />
          <meta property="og:description" content={siteDescription} />
          <meta property="og:image" content="/og-preview.jpg" />

          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content={`https://${process.env.VERCEL_URL}/`} />
          <meta property="twitter:title" content={siteTitle} />
          <meta property="twitter:description" content={siteDescription} />
          <meta property="twitter:image" content="/og-preview.jpg"></meta>
        </Head>

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

      <Script src="./js/emerge.js"></Script>
    </>
  )
}
