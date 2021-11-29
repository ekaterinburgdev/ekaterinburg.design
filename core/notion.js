const { Client: NotionClient } = require("@notionhq/client");
const Typograf = require('typograf');

const tp = new Typograf({ locale: ['ru', 'en-US'] });

tp.disableRule([
  'common/space/delBeforePunctuation',
  'common/space/afterPunctuation',
  'common/nbsp/replaceNbsp',
]);

const NOTION_DATABASES = {
  'TeamNew': process.env.NOTION_DATABASE_TEAM_NEW,
  'TeamOld': process.env.NOTION_DATABASE_TEAM_OLD,
  'Partners': process.env.NOTION_DATABASE_PARTNERS,
  'Projects': process.env.NOTION_DATABASE_PROJECTS
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
      return tp.execute(value.title[0]?.plain_text) || '';
    case "rich_text":
      return tp.execute(value.rich_text[0]?.plain_text) || '';
    case "number":
      return value.number || '';
    case "select":
      return value.select.name || '';
    case "multi_select":
      return value.multi_select.map(x => x?.name) || [];
    case "date":
      return value.date || '';
    case "people":
      return value.people || '';
    case "files":
      return value.files.map(x => x?.file?.url) || [];
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
