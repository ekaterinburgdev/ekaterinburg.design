# Ekaterinburg Design Code site

🎨 Website for announcements of Ekaterinburg designers community

**[ekaterinburg.design](https://ekaterinburg.design)**

## Development

1. Install [Node.js](https://nodejs.org/en/download/)

2. Install dependencies
```sh
npm i 
```

3. Add `.env.local` with Notion tokens and Vercel
```sh
NOTION_TOKEN=
NOTION_DATABASE_TEAM=
NOTION_DATABASE_PARTNERS=
NOTION_DATABASE_PROJECTS=
NOTION_DATABASE_TEXTBLOCKS=
VERCEL_URL=localhost:3000
```

4. Run local server
```sh
npm run dev
```

## Content management

### Notion
- Projects
- Partners
- Team
- Contacts
- Textblocks with custom HTML

### Other content
- Announcements pages in [/public path](https://github.com/ekaterinburgdev/ekaterinburg.design/tree/main/public) (Will be moved to Notion in the future)
- Map widget in [design-map repository](https://github.com/ekaterinburgdev/design-map)
