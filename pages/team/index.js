import Layout from '../../components/Layout'
import Head from 'next/head'

const team = [
  {
    "name": "Алексей Быков",
    "image": "https://ekaterinburg.design/data/team/lesha-userpic@2x.jpg",
    "role": "промышленный дизайнер"
  },
  {
    "name": "Владислав Деревянных",
    "image": "https://ekaterinburg.design/data/team/vlad-userpic@2x.jpg",
    "role": "дизайнер"
  },
  {
    "name": "Елена Габдлахатова",
    "image": "https://ekaterinburg.design/data/team/lena-userpic@2x.jpg",
    "role": "дизайнер"
  },
  {
    "name": "Мария Ермакова",
    "image": "https://ekaterinburg.design/data/team/maria-userpic@2x.jpg",
    "role": "директор информационно-туристической службы"
  },
  {
    "name": "Паша Омелёхин",
    "image": "https://ekaterinburg.design/data/team/pasha-userpic@2x.jpg",
    "role": "дизайнер"
  },
  {
    "name": "Дмитрий Фатхиев-Долохов",
    "image": "https://ekaterinburg.design/data/team/dima-userpic@2x.jpg",
    "role": "иллюстратор"
  },
  {
    "name": "Дмитрий Фогель",
    "image": "https://ekaterinburg.design/data/team/dmitry-userpic@2x.jpg",
    "role": "главный художник города"
  },
  {
    "name": "Михаил Череда",
    "image": "https://ekaterinburg.design/data/team/misha-userpic@2x.jpg",
    "role": "дизайнер"
  },
  {
    "name": "Сергей Шашмурин",
    "image": "https://ekaterinburg.design/data/team/serezha-userpic@2x.jpg",
    "role": "промышленный дизайнер"
  },
  {
    "name": "Никита Харисов",
    "image": "https://ekaterinburg.design/data/team/nikita-userpic@2x.jpg",
    "role": "креативный директор «Атомстройкомплекса»"
  }
]

export default function Team() {
  return (
    <Layout>
      <Head>
        <title>Команда</title>
      </Head>
      {team.map(({ name, image, role }) => (
        <figure key={name}>
          <img src={image} alt={name} width={100} height={100} />
          <figcaption>{name}, {role}</figcaption>
        </figure>
      ))}
    </Layout>
  )
}

