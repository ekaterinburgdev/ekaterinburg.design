import { getNotionDB } from "../notion";

export default async function getProjects() {
    const projects = await getNotionDB(process.env.NOTION_DATABASE_PROJECTS);

    const sortByPriority = (a, b) => {
        if (a.priority > b.priority) { return -1; }
        if (a.priority < b.priority) { return 1; }
        return 0;
    }

    return projects
        .filter(({ published }) => published)
        .sort(sortByPriority)
}
