import { getNotionDB } from "../notion";

export default async function getPartners() {
    const partners = await getNotionDB(process.env.NOTION_DATABASE_PARTNERS);

    const sortByPriority = (a, b) => {
        if (a.priority > b.priority) { return -1; }
        if (a.priority < b.priority) { return 1; }
        return 0;
    }

    return partners
        .filter(({ published }) => published)
        .sort(sortByPriority)
}
