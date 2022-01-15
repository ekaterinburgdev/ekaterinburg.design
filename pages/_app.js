import Router from 'next/router'
import NProgress from 'nprogress'

import '../styles/global.scss'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })
Router.events.on('routeChangeStart', (url) => {
    if (url !== '/') NProgress.start()
})

Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

function SiteApp({ Component, pageProps }) {
    return <Component {...pageProps} />
}

export default SiteApp
