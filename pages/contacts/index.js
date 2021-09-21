import Layout from '../../components/Layout'
import Head from 'next/head'

import contacts from '../../data/contacts.json';

export default function Contacts() {
  return (
    <Layout>
      <Head>
        <title>Почта и соцсети</title>
      </Head>

      <ul>
        {contacts.map(({ caption, link }) =>
          <li><a href={link} target="_blank">{caption}</a></li>
        )}
      </ul>
    </Layout >
  )
}

