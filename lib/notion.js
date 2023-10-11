
import path from 'node:path';
import fs from 'node:fs';
import { Client as NotionClient } from '@notionhq/client';
import Typograf from 'typograf';

let CACHED_FILES_LIST = [];

const tp = new Typograf({ locale: ['ru', 'en-US'] });

tp.disableRule([
  'common/space/delBeforePunctuation',
  'common/space/afterPunctuation',
  'common/nbsp/replaceNbsp',
]);

const notion = new NotionClient({ auth: process.env.NOTION_TOKEN });

export async function getNotionDB(databaseId) {
  CACHED_FILES_LIST = await loadCachedFilesList();

  let responseData = [];
  let cursor;

  while (cursor !== null) {
    const response = await notion.databases.query({
      database_id: databaseId,
      start_cursor: cursor || undefined
    });
    
    cursor = response.next_cursor;
    responseData = responseData.concat(response.results.map(x => x.properties));
  }

  return responseData.map(item => (
    Object.fromEntries(Object.entries(item)
      .map(([key, value]) => [
        key.charAt(0).toLowerCase() + key.slice(1),
        getNotionValueByType(value, value.type)
      ]))
  ))
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
  const [filename] = new URL(url).pathname.split('/').slice(-1);
  const fileExt = filename.split('.').slice(-1)[0];
  const notionGUID = url.includes('notion-static.com') ? url.match(/secure.notion-static.com\/(.*)\//)[1] : '';
  const notionFilename = notionGUID ? `${notionGUID}.${fileExt}` : filename;

  const cachedFileUrl = CACHED_FILES_LIST.includes(notionFilename) ? `/notion-static/${notionFilename}` : url;
  return cachedFileUrl;
}

async function loadCachedFilesList() {
  let fileList;
  try {
    const response = await fetch(`http://${process.env.VERCEL_URL}/notion-static/filelist.json`);
    fileList = await response.json();
  } catch {
    fileList = fs.readFileSync(path.join(process.cwd(), 'public', 'notion-static', 'filelist.json'), 'utf8');
  }
  return fileList;
}
