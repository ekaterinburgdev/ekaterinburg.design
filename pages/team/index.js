import { getNotionDatabaseItems } from '../../lib/notion'

import Layout from '../../components/Layout'
import Head from 'next/head'
import Image from 'next/image'

export default function Team({ team }) {
  return (
    <Layout>
      <Head>
        <title>Команда</title>
      </Head>
      {team.map(({ link, name, image, role }) => (
        <a href={link} target="_blank" key={name}>
          <figure >
            <Image src={image} alt={name} width={100} height={100} />
            <figcaption>{name}, {role}</figcaption>
          </figure>
        </a>
      ))}
    </Layout>
  )
}

export async function getServerSideProps() {
  return { props: { team: await getNotionDatabaseItems('Team') } }
}
