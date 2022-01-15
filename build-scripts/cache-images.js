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

    console.log('Download files from Notion...');
    const downloads = await Promise.all(items.map(x => download(x)));
    console.log('Files loaded: ', downloads);
    fs.writeFileSync(VERCEL_OUTPUT_PATH + 'filelist.json', JSON.stringify(downloads));
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
    return new Promise((res) => {
        const filename = url.split('/').slice(-1)[0].split('?')[0];
    
        const file = fs.createWriteStream(VERCEL_OUTPUT_PATH + filename);
    
        https.get(url, (response) => {
            response.pipe(file);
        });
    
        file.on("finish", () => {
            file.close();
            res(filename);
        });
    
        file.on("error", () => {
            console.error(`Not loaded: ${filename}`);
            res('');
        });
    });
}

