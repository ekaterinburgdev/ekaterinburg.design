export function getNotionFilename(notionFileUrl) {
    const [guid, filename] = new URL(notionFileUrl).pathname.split('/').slice(-2);
    return `${guid}__${filename}`;
}
