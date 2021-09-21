import Layout from '../../components/Layout'
import Head from 'next/head'


const contacts = [
  {
    caption: 'mail@ekaterinburg.design',
    link: 'mailto:mail@ekaterinburg.design'
  },
  {
    caption: 'группа в фейсбуке',
    link: 'https://www.facebook.com/groups/ekaterinburg.design/'
  },
  {
    caption: 'инстаграм',
    link: 'https://www.instagram.com/ekaterinburg.design/'
  }
]

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

