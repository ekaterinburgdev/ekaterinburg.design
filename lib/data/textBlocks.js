import { getNotionDB } from "../notion";

export default async function getTextBlocks() {
    return await getNotionDB(process.env.NOTION_DATABASE_TEXTBLOCKS);
}
