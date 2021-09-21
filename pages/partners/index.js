import Layout from '../../components/Layout'
import Head from 'next/head'

import partners from '../../data/partners.json';

export default function Partners() {
  return (
    <Layout>
      <Head>
        <title>Партнеры</title>
      </Head>

      {partners.map(({ link, name, image, description }) =>
        <div key={name} style={{ marginBottom: 20 }}>
          <a href={link} target="_blank">
            <img src={image} alt="" style={{ backgroundColor: 'black' }} width={100} />
            {name}
          </a>
          <div>{description}</div>
        </div>
      )}
    </Layout>
  )
}

