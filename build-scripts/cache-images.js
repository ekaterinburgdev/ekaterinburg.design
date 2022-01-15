const https = require('https');
const fs = require('fs');
const { Client: NotionClient } = require("@notionhq/client");
require('dotenv-flow').config();

const VERCEL_OUTPUT_PATH = './public/notion-static/';

(async () => {
    const items = [
        ...await getNotionImagesFromDatabase('Projects'),
        ...await getNotionImagesFromDatabase('Team'),
        ...await getNotionImagesFromDatabase('Partners')
    ];

    if (fs.existsSync(VERCEL_OUTPUT_PATH)) {
        fs.rmSync(VERCEL_OUTPUT_PATH, { recursive: true });
    }

    fs.mkdirSync(VERCEL_OUTPUT_PATH, { recursive: true });

    items.forEach(x => {
        download(x);
    })
})();

async function getNotionImagesFromDatabase(databaseName) {
    const notion = new NotionClient({ auth: process.env.NOTION_TOKEN });
    
    const NOTION_DATABASES = {
        'Team': process.env.NOTION_DATABASE_TEAM,
        'Partners': process.env.NOTION_DATABASE_PARTNERS,
        'Projects': process.env.NOTION_DATABASE_PROJECTS
    };

    const databaseId = NOTION_DATABASES[databaseName];
    const response = await notion.databases.query({ database_id: databaseId });
    const data = response.results.map(x => x.properties);

    return data.flatMap(item => {
        return Object.values(item).filter(x => x.type === 'files').flatMap(x => x.files.flatMap(x => x?.file?.url));
    })
}

function download(url) {
    const filename = url.split('/').slice(-1)[0].split('?')[0];

    const file = fs.createWriteStream(VERCEL_OUTPUT_PATH + filename);

    https.get(url, (response) => {
        response.pipe(file);
    });

    file.on("finish", () => {
        file.close();
        console.error(`Loaded: ${filename}`);
    });

    file.on("error", () => {
        console.error(`Not loaded: ${filename}`);
    });
}
