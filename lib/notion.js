const { Client: NotionClient } = require("@notionhq/client");

const NOTION_TOKEN = 'secret_BGX09W2jCBXeiJXGTbpDc2B4suHgIv2pZrJiq1Oaach';
const NOTION_DATABASES = {
  'Team': process.env.NOTION_DATABASE_TEAM,
  'Partners': process.env.NOTION_DATABASE_PARTNERS,
  'Сontacts': process.env.NOTION_DATABASE_CONTACTS
};

const notion = new NotionClient({ auth: process.env.NOTION_TOKEN });

export async function getNotionDatabaseItems(databaseName) {
  const databaseId = NOTION_DATABASES[databaseName];
  const response = await notion.databases.query({ database_id: databaseId });
  const data = response.results.map(x => x.properties);

  return data.map(item => {
    return Object.fromEntries(Object.entries(item)
      .map(([key, value]) => [key.toLowerCase(), getNotionValueByType(value, value.type)]));
  })
}

function getNotionValueByType(value, type) {
  switch (type) {
    case "title":
      return value.title[0]?.plain_text || '';
    case "rich_text":
      return value.rich_text[0]?.plain_text || '';
    case "number":
      return value.number || '';
    case "select":
      return value.select.name || '';
    case "multi_select":
      return value.multi_select[0]?.name || '';
    case "date":
      return value.date || '';
    case "people":
      return value.people || '';
    case "files":
      return value.files[0]?.file?.url || '';
    case "checkbox":
      return value.checkbox || '';
    case "url":
      return value.url || '';
    case "email":
      return value.email || '';
    case "phone_number":
      return value.phone_number || '';
    case "formula":
      return value.formula.string || '';
  }
}
