import { getNotionDatabaseItems } from '../../core/notion'

import Layout from '../../components/Layout'
import Head from 'next/head'
import Image from 'next/image'

export default function Team({ team }) {
  return (
    <Layout>
      <Head>
        <title>Команда</title>
      </Head>
      {team.map(({ имя, роли, сайт, фото }) => (
        <a href={сайт} target="_blank" key={имя}>
          <figure>
            {фото.length > 0 && <Image  src={фото[0]} width={100} height={100} alt="" />}
            <figcaption>{имя}<br />{роли.map(x => x.toLowerCase()).join(', ')}</figcaption>
          </figure>
        </a>
      ))}
    </Layout>
  )
}

export async function getServerSideProps() {
  return {
    props: {
      team: [
        ... await getNotionDatabaseItems('TeamOld'),
        ... await getNotionDatabaseItems('TeamNew')
      ]
    }
  }
}
