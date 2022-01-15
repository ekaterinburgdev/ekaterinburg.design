import https from 'https';
import fs from 'fs';
import { Client } from '@notionhq/client';
import imagemin from 'imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';
import imageminSvgo from 'imagemin-svgo';
import dotenv from 'dotenv-flow';

dotenv.config();
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

    console.log('Optimize downloaded files...');
    const files = await imagemin([`${VERCEL_OUTPUT_PATH}/*.{jpg,jpeg,png,svg}`], {
        destination: VERCEL_OUTPUT_PATH,
        plugins: [
            imageminMozjpeg({ quality: 85 }),
            imageminPngquant({ quality: [.8, .9] }),
            imageminSvgo()
        ]
    });
    console.log('Files optimized!');
})();

async function getNotionImagesFromDatabase(databaseName) {
    const notion = new Client({ auth: process.env.NOTION_TOKEN });
    
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
        const notionGUID = url.includes('notion-static.com') ? url.match(/secure.notion-static.com\/(.*)\//)[1] : '';
        const filename = url.split('/').slice(-1)[0].split('?')[0];
        const fileExt = filename.split('.').slice(-1)[0];
        const outputFilename = notionGUID ? `${notionGUID}.${fileExt}` : filename;
    
        const file = fs.createWriteStream(VERCEL_OUTPUT_PATH + outputFilename);
    
        https.get(url, (response) => {
            response.pipe(file);
        });
    
        file.on("finish", () => {
            file.close();
            res(outputFilename);
        });
    
        file.on("error", () => {
            console.error(`Not loaded: ${outputFilename}`);
            res('');
        });
    });
}

