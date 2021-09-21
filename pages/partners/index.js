import Layout from '../../components/Layout'
import Head from 'next/head'

// TODO alt к логотипам
const partners = [
  {
    "link": "http://xn--80acgfbsl1azdqr.xn--p1ai/",
    "image": "https://ekaterinburg.design/data/images/gerb-ekb.svg"
  },
  {
    "link": "http://its.ekburg.ru/",
    "image": "https://ekaterinburg.design/data/images/its-logo.svg"
  },
  {
    "link": "https://atomsk.ru/",
    "image": "https://ekaterinburg.design/data/images/atom-logo.svg"
  },
  {
    "link": "https://e1.ru/",
    "image": "https://ekaterinburg.design/data/images/e1.svg"
  },
  {
    "link": "https://vk.com/made_in_ural",
    "image": "https://ekaterinburg.design/data/images/miu-logo.svg"
  }
]

export default function Partners() {
  return (
    <Layout>
      <Head>
        <title>Партнеры</title>
      </Head>

      <ul>
        {partners.map(({ link, image }) =>
          <li>
            <a href={link} target="_blank">
              <img src={image} alt="" style={{backgroundColor: 'black'}} width={100}  />
            </a>
          </li>
        )}
      </ul>
    </Layout>
  )
}

