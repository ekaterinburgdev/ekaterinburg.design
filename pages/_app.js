import Router from 'next/router'
import NProgress from 'nprogress'

import 'nprogress/nprogress.css'
import '../styles/global.scss'

NProgress.configure({ showSpinner: false })
Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

function SiteApp({ Component, pageProps }) {
    return <Component {...pageProps} />
}

export default SiteApp
