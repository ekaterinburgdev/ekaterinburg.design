
const path = require('path');
const fs = require('fs');
const { Client: NotionClient } = require("@notionhq/client");
const Typograf = require('typograf');

let CACHED_FILES_LIST = [];
const NOTION_DATABASES = {
  'Team': process.env.NOTION_DATABASE_TEAM,
  'Partners': process.env.NOTION_DATABASE_PARTNERS,
  'Projects': process.env.NOTION_DATABASE_PROJECTS
};

const tp = new Typograf({ locale: ['ru', 'en-US'] });

tp.disableRule([
  'common/space/delBeforePunctuation',
  'common/space/afterPunctuation',
  'common/nbsp/replaceNbsp',
]);

const notion = new NotionClient({ auth: process.env.NOTION_TOKEN });

export async function getNotionDatabaseItems(databaseName) {
  CACHED_FILES_LIST = await loadCachedFilesList();
  const databaseId = NOTION_DATABASES[databaseName];
  const response = await notion.databases.query({ database_id: databaseId });
  const data = response.results.map(x => x.properties);

  return data.map(item => {
    return Object.fromEntries(Object.entries(item)
      .map(([key, value]) => [key.charAt(0).toLowerCase() + key.slice(1), getNotionValueByType(value, value.type)]));
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
      const files = value.files.map(x => x?.file?.url).map(x => getFileFromCache(x)) || [];
      return files;
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

function getFileFromCache(url) {
  const [ filename ] = new URL(url).pathname.split('/').slice(-1);
  const cachedFileUrl = CACHED_FILES_LIST.includes(filename) ? `/notion-static/${filename}` : url;
  return cachedFileUrl;
}

async function loadCachedFilesList() {
  let fileList;
  try {
    const response = await fetch(`http://${process.env.VERCEL_URL}/notion-static/filelist.json`);const path = require('path');
    fileList = await response.json();
  } catch {
    fileList = fs.readFileSync(path.join(process.cwd(), 'public', 'notion-static', 'filelist.json'), 'utf8');
  }
  return fileList;
}
