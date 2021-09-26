import { getNotionDatabaseItems } from '../../lib/notion'

import Layout from '../../components/Layout'
import Head from 'next/head'

export default function Contacts({ contacts }) {
  return (
    <Layout>
      <Head>
        <title>Почта и соцсети</title>
      </Head>

      <ul>
        {contacts.map(({ name, link }) =>
          <li key={name}><a href={link} target="_blank">{name}</a></li>
        )}
      </ul>
    </Layout >
  )
}

export async function getStaticProps() {
  return { props: { contacts: await getNotionDatabaseItems('Сontacts') } }
}
