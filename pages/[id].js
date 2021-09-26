import { getNotionDatabaseItems } from '../core/notion'

import Layout from '../components/Layout'
import Head from 'next/head'

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1>{postData.title}</h1>
      </article>
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = await (await getNotionDatabaseItems("Projects")).map(({ id }) => {
    return { params: { id } }
  })
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const postData = await (await getNotionDatabaseItems("Projects")).find(({ id }) => params.id === id)
  return {
    props: {
      postData
    }
  }
}
