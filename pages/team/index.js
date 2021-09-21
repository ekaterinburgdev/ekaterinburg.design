import Layout from '../../components/Layout'
import Head from 'next/head'

import team from '../../data/team.json';

export default function Team() {
  return (
    <Layout>
      <Head>
        <title>Команда</title>
      </Head>
      {team.map(({ link, name, image, role }) => (
        <a href={link} target="_blank">
          <figure key={name}>
            <img src={image} alt={name} width={100} height={100} />
            <figcaption>{name}, {role}</figcaption>
          </figure>
        </a>
      ))}
    </Layout>
  )
}

